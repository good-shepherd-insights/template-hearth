// The texts on /sample that are the business's own, and the answer each one is. What is listed here
// can be typed into; everything else is the template's wording.
import { type Business, type Change, type Item, type ListKind } from "./business";

type Text = { select: string; field: "name" | "headline" | "about" | "phone" | "email" | "address" | "hours" | "areas" };
type ListText = { select: string; list: ListKind; part: "title" | "text" };

const TEXTS: (Text | ListText)[] = [
  { select: ".brand > span", field: "name" },
  { select: ".hero h1", field: "headline" },
  { select: ".hero-copy > p:not(.hero-badge)", field: "about" },
  { select: ".area-chip", field: "areas" },
  { select: ".contact-phone", field: "phone" },
  { select: ".contact-email", field: "email" },
  { select: ".contact-address", field: "address" },
  { select: ".contact-hours", field: "hours" },
  { select: ".trust-item span", list: "point", part: "title" },
  { select: ".service h3", list: "service", part: "title" },
  { select: ".service p", list: "service", part: "text" },
  { select: ".step h3", list: "step", part: "title" },
  { select: ".step p", list: "step", part: "text" },
];

// Which item a text belongs to: its place among the cards, as one may have no text of its own.
const itemOf = (element: Element, list: ListKind) => {
  const card = element.closest({ point: ".trust-item", service: ".service", step: ".step", review: ".review" }[list]);
  return card?.parentElement ? [...card.parentElement.children].indexOf(card) : -1;
};

/** Marks what can be typed into. */
export function markEditable(page: HTMLElement, business: Business) {
  for (const { select, ...at } of TEXTS) {
    page.querySelectorAll<HTMLElement>(select).forEach((element) => {
      if ("list" in at && business[at.list]?.[itemOf(element, at.list)] === undefined) return;
      element.contentEditable = "true";
    });
  }
}

/** The business with a change made, so the next change starts from it. */
export const applied = (business: Business, change: Change): Business =>
  "list" in change ? { ...business, [change.list]: change.items } : { ...business, [change.field]: change.value };

/** What changed, or nothing when the words are as they were. */
export function changeIn(element: HTMLElement, business: Business): Change | undefined {
  const value = (element.textContent ?? "").replace(/\s+/g, " ").trim();
  if (value === element.getAttribute("data-was")) return undefined;
  const at = TEXTS.find(({ select }) => element.matches(select));
  if (at === undefined) return undefined;
  if (!("list" in at)) {
    if (at.field !== "areas") return { field: at.field, value };
    const index = element.parentElement ? [...element.parentElement.children].indexOf(element) : -1;
    return { field: "areas", value: (business.areas ?? []).map((area, i) => (i === index ? value : area)) };
  }
  const items: Item[] = business[at.list] ?? [];
  const index = itemOf(element, at.list);
  return { list: at.list, items: items.map((item, i) => (i === index ? { ...item, [at.part]: value } : item)) };
}
