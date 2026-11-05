<script setup lang="ts">
// Slice component pattern: prismic.io/docs/nuxt.md, "Write Vue components".
// Group loop: prismic.io/docs/fields/repeatable-group.md. Design: project/Main.dc.html lines 96–105.
import type { Content } from "@prismicio/client";

defineProps(getSliceComponentProps<Content.HearthHowItWorksSlice>());
</script>

<template>
  <section class="section section-white" :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation">
    <div class="container">
      <div class="section-head section-head-center">
        <PrismicRichText :field="slice.primary.heading" />
      </div>
      <ol class="steps">
        <li v-for="(step, i) in slice.primary.steps" :key="i" class="step">
          <span class="step-number" aria-hidden="true">{{ i + 1 }}</span>
          <PrismicRichText :field="step.title" />
          <PrismicRichText :field="step.text" />
        </li>
      </ol>
    </div>
  </section>
</template>
