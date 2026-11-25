<script setup lang="ts">
// app.vue with a header/footer around <NuxtPage />: nuxt.com/docs/4.x/directory-structure/app/app
// ("Usage with Pages"); a single layout belongs in app.vue, not layouts/
// (nuxt.com/docs/4.x/directory-structure/app/layouts: "If you only have a single layout ... use app.vue").
const settings = useSettings();
const cta = useCta();

// Font pairing is a Select field on Settings (prismic.io/docs/fields/select.md: "Select field values
// can be used like a string"). Fonts load as <link> tags through useHead
// (nuxt.com/docs/4.x/api/composables/use-head: `link?: Link[]`); the URLs are fixed strings here,
// never taken from content.
const fontPairs = {
  Modern: { family: "'Plus Jakarta Sans', system-ui, sans-serif", href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&display=swap" },
  Classic: { family: "Fraunces, Georgia, serif", href: "https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&display=swap" },
  Friendly: { family: "Nunito, system-ui, sans-serif", href: "https://fonts.googleapis.com/css2?family=Nunito:wght@700;800&display=swap" },
} as const;
const fonts = computed(() => fontPairs[settings.value?.data.font_pair ?? "Modern"] ?? fontPairs.Modern);

useHead({
  title: computed(() => settings.value?.data.business_name ?? ""),
  link: computed(() => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" },
    { rel: "stylesheet", href: fonts.value.href },
  ]),
});

// Brand colours are Color fields, "saved as a hex value" and usable "anywhere hex color values are
// supported" (prismic.io/docs/fields/color.md). They become CSS variables through Vue's :style
// object binding (vuejs.org/guide/essentials/class-and-style.html, "Binding Inline Styles"); Vue
// applies keys starting with "--" via style.setProperty (@vue/runtime-dom 3.5.44,
// runtime-dom.esm-bundler.js:586). Unset fields fall back to the defaults in global.css.
const brandVars = computed(() => ({
  ...(settings.value?.data.primary_color ? { "--brand": settings.value.data.primary_color } : {}),
  ...(settings.value?.data.accent_color ? { "--accent": settings.value.data.accent_color } : {}),
  "--font-heading": fonts.value.family,
}));
</script>

<template>
  <div class="site" :style="brandVars">
    <div v-if="settings?.data.city || settings?.data.license_note || settings?.data.phone" class="topbar">
      <div class="container topbar-row">
        <span>
          <template v-if="settings?.data.city">{{ settings.data.city }}</template>
          <template v-if="settings?.data.license_note"><template v-if="settings.data.city"> · </template>{{ settings.data.license_note }}</template>
        </span>
        <a v-if="settings?.data.phone" :href="`tel:${settings.data.phone}`">Call {{ settings.data.phone }}</a>
      </div>
    </div>

    <header class="header">
      <div class="container header-row">
        <NuxtLink to="/" class="brand">
          <!-- prismicio-vue/v6.md <PrismicImage>; alt="" declares it decorative — the name beside it is the text. -->
          <PrismicImage v-if="$prismic.isFilled.image(settings?.data.logo)" :field="settings!.data.logo" alt="" class="brand-logo" />
          <span>{{ settings?.data.business_name }}</span>
        </NuxtLink>
        <a v-if="cta" :href="cta.href" class="btn btn-accent">{{ cta.label }}</a>
      </div>
    </header>

    <NuxtPage />

    <footer class="footer">
      <div class="container footer-grid">
        <div>
          <strong class="footer-name">{{ settings?.data.business_name }}</strong>
          <p v-if="settings?.data.trade || settings?.data.city">
            {{ [settings?.data.trade, settings?.data.city].filter(Boolean).join(" in ") }}
          </p>
        </div>
        <div v-if="settings?.data.phone || settings?.data.email || settings?.data.address">
          <strong>Contact</strong>
          <p v-if="settings?.data.phone" class="contact-phone">{{ settings.data.phone }}</p>
          <p v-if="settings?.data.email" class="contact-email">{{ settings.data.email }}</p>
          <p v-if="settings?.data.address" class="contact-address">{{ settings.data.address }}</p>
        </div>
        <div v-if="settings?.data.hours">
          <strong>Hours</strong>
          <p class="contact-hours">{{ settings.data.hours }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>
