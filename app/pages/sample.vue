<script setup lang="ts">
// The template with a business's own details in it, before any Prismic repository exists. Made to be
// embedded: it says it is ready, shows whatever business it is sent, and answers with the content a
// site would be built from. What is typed on it is sent as a change; the page keeps nothing itself.
import { components } from "~/slices";
import { VERSION, type Business } from "~/utils/business";

type Message = { type?: string; version?: number; key?: number; editable?: boolean; business?: Business };

const business = useSample();
// The same business with what was typed since, so two quick changes both count.
let latest: Business | null = null;
// What arrived while somebody was typing.
let waiting: Message | undefined;
let editable = false;
// Sections arrive after the draw that asked for them, so they are marked as they do.
let watching: MutationObserver | undefined;
// Typing changes the page behind Vue's back, so it is drawn anew rather than patched.
const drawing = ref(0);
const preview = computed(() => business.value && previewOf(business.value));
const { commit } = useRuntimeConfig().public;
// The embedding page's address, known from its first message.
let parent: string | undefined;

const tell = (message: object) => parent !== undefined && window.parent.postMessage({ version: VERSION, ...message }, parent);

function onMessage({ source, origin, data }: MessageEvent<Message>) {
  if (source !== window.parent || data?.type !== "business" || data.version !== VERSION || typeof data.business?.name !== "string") return;
  if (parent !== undefined && origin !== parent) return;
  parent = origin;
  latest = data.business;
  waiting = data;
  // The answer does not wait for somebody to finish typing. The drawing does.
  tell({ type: "content", key: data.key, commit, uses: USES, documents: documentsOf(data.business) });
  draw();
}

const isTyping = () => document.activeElement instanceof HTMLElement && document.activeElement.isContentEditable;

function draw() {
  if (waiting?.business === undefined || isTyping()) return;
  editable = waiting.editable === true;
  business.value = waiting.business;
  waiting = undefined;
  drawing.value++;
}

function onEnter({ target }: FocusEvent) {
  if (target instanceof HTMLElement && target.isContentEditable) target.setAttribute("data-was", target.textContent ?? "");
}

function onLeave({ target }: FocusEvent) {
  if (!(target instanceof HTMLElement) || !target.isContentEditable || latest === null) return;
  const change = changeIn(target, latest);
  if (change !== undefined) {
    latest = applied(latest, change);
    tell({ type: "change", change });
  }
  // Once whatever is focused next is.
  setTimeout(draw);
}

function onKey(event: KeyboardEvent) {
  if (!(event.target instanceof HTMLElement) || !event.target.isContentEditable) return;
  if (event.key === "Escape") event.target.textContent = event.target.getAttribute("data-was");
  if (event.key === "Enter" || event.key === "Escape") {
    event.preventDefault();
    event.target.blur();
  }
}

function onPaste(event: ClipboardEvent) {
  if (!(event.target instanceof HTMLElement) || !event.target.isContentEditable) return;
  event.preventDefault();
  document.execCommand("insertText", false, (event.clipboardData?.getData("text/plain") ?? "").replace(/\s+/g, " "));
}

// It is a picture of a site, not one: nothing on it goes anywhere.
const onClick = (event: MouseEvent) => event.target instanceof Element && event.target.closest("a") && event.preventDefault();

onMounted(() => {
  window.addEventListener("message", onMessage);
  watching = new MutationObserver(() => editable && latest !== null && markEditable(document.body, latest));
  watching.observe(document.body, { childList: true, subtree: true });
  document.addEventListener("focusin", onEnter);
  document.addEventListener("focusout", onLeave);
  document.addEventListener("keydown", onKey);
  document.addEventListener("paste", onPaste);
  document.addEventListener("click", onClick, true);
  // Says nothing but that it loaded, so any page may hear it.
  window.parent.postMessage({ type: "ready", version: VERSION }, "*");
});
onUnmounted(() => {
  window.removeEventListener("message", onMessage);
  watching?.disconnect();
  document.removeEventListener("focusin", onEnter);
  document.removeEventListener("focusout", onLeave);
  document.removeEventListener("keydown", onKey);
  document.removeEventListener("paste", onPaste);
  document.removeEventListener("click", onClick, true);
});

useHead({ meta: [{ name: "robots", content: "noindex" }] });
</script>

<template>
  <main>
    <SliceZone v-if="preview" :key="drawing" :slices="preview.slices" :components="components" />
  </main>
</template>
