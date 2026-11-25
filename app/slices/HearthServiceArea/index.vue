<script setup lang="ts">
// Slice component pattern: prismic.io/docs/nuxt.md, "Write Vue components"; <PrismicImage>:
// prismicio-vue/v6.md. Group loop: prismic.io/docs/fields/repeatable-group.md.
// Design: project/Main.dc.html lines 123–138.
import type { Content } from "@prismicio/client";

defineProps(getSliceComponentProps<Content.HearthServiceAreaSlice>());
</script>

<template>
  <section class="section section-white" :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation">
    <div class="container area">
      <div class="area-copy">
        <p v-if="slice.primary.eyebrow" class="eyebrow">{{ slice.primary.eyebrow }}</p>
        <div class="section-head"><PrismicRichText :field="slice.primary.heading" /></div>
        <PrismicRichText :field="slice.primary.text" />
        <ul class="area-chips">
          <li v-for="(area, i) in slice.primary.areas" :key="i" class="area-chip">{{ area.name }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
