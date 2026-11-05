<script setup lang="ts">
// Slice component pattern: prismic.io/docs/nuxt.md, "Write Vue components" (getSliceComponentProps,
// PrismicRichText, PrismicLink). Props helper: prismic.io/docs/technical-reference/prismicio-vue/v6.md,
// "getSliceComponentProps". Design: project/Main.dc.html lines 27–65 (hero section).
import type { Content } from "@prismicio/client";

defineProps(getSliceComponentProps<Content.HearthHeroSlice>());

// Main button and phone come from the Settings document, fetched once under a shared key
// (prismic.io/docs/nuxt.md, "Fetch content in pages and slices"; app/composables/useSettings.ts).
const settings = useSettings();
</script>

<template>
  <section class="hero" :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation">
    <div class="container hero-copy">
      <p v-if="slice.primary.rating_text" class="hero-badge">★ {{ slice.primary.rating_text }}</p>
      <!-- `heading` allows heading1 + em. The highlighted word is an `em` span, not a custom label:
           Migration API rich-text spans may only be "em", "strong" or "hyperlink"
           (prismic.io/docs/migration-api-technical-reference.md, "Rich text"), so a label could not
           be seeded. <PrismicRichText> renders `em` as <em> by default (prismicio-vue/v6.md
           <PrismicRichText>: "Standard HTML elements"); main.css styles `.hero h1 em`. -->
      <PrismicRichText :field="slice.primary.heading" />
      <PrismicRichText :field="slice.primary.description" />
      <div class="hero-actions">
        <PrismicLink v-if="$prismic.isFilled.link(settings?.data.cta_link)" :field="settings!.data.cta_link" class="btn btn-accent">
          {{ settings?.data.cta_label }}
        </PrismicLink>
        <a v-if="settings?.data.phone" :href="`tel:${settings.data.phone}`" class="btn btn-ghost">{{ settings.data.phone }}</a>
      </div>
    </div>
    <div class="container hero-photos">
      <!-- <PrismicImage>: prismicio-vue/v6.md. Image alt text comes from the image field itself. -->
      <figure class="hero-photo">
        <PrismicImage v-if="$prismic.isFilled.image(slice.primary.image_one)" :field="slice.primary.image_one" />
        <figcaption v-if="slice.primary.chip_one" class="hero-chip">{{ slice.primary.chip_one }}</figcaption>
      </figure>
      <figure class="hero-photo">
        <PrismicImage v-if="$prismic.isFilled.image(slice.primary.image_two)" :field="slice.primary.image_two" />
        <figcaption v-if="slice.primary.chip_two" class="hero-chip hero-chip-right">{{ slice.primary.chip_two }}</figcaption>
      </figure>
    </div>
  </section>
</template>
