<script setup lang="ts">
// Slice component pattern: prismic.io/docs/nuxt.md, "Write Vue components" (PrismicRichText,
// PrismicLink). Group loop: prismic.io/docs/fields/repeatable-group.md.
// Design: project/Main.dc.html lines 76–94 (services section).
import type { Content } from "@prismicio/client";

defineProps(getSliceComponentProps<Content.HearthServicesSlice>());
</script>

<template>
  <section class="section" :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation">
    <div class="container services">
      <div class="section-head services-head">
        <div>
          <p v-if="slice.primary.eyebrow" class="eyebrow">{{ slice.primary.eyebrow }}</p>
          <PrismicRichText :field="slice.primary.heading" />
        </div>
        <!-- Link with custom text (`--allow-text`); <PrismicLink> renders the field's text by default
             (prismicio-vue/v6.md <PrismicLink>; prismic.io/docs/fields/link.md). -->
        <PrismicLink v-if="$prismic.isFilled.link(slice.primary.all_services)" :field="slice.primary.all_services" class="text-link" />
      </div>
      <div class="services-grid">
        <article v-for="(service, i) in slice.primary.services" :key="i" class="card service">
          <PrismicRichText :field="service.name" />
          <PrismicRichText :field="service.description" />
          <PrismicLink v-if="$prismic.isFilled.link(service.link)" :field="service.link" class="text-link" />
        </article>
      </div>
    </div>
  </section>
</template>
