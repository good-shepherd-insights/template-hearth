<script setup lang="ts">
// Slice component pattern: prismic.io/docs/nuxt.md, "Write Vue components".
// Repeatable group rendered with a loop: prismic.io/docs/fields/repeatable-group.md
// ("Repeatable groups can be displayed using a loop"). Design: project/Main.dc.html lines 67–74.
import type { Content } from "@prismicio/client";

defineProps(getSliceComponentProps<Content.HearthTrustStripSlice>());

// The `icon` Select field holds one of these values (prismic.io/docs/fields/select.md: "Select field
// values can be used like a string"). Paths are the stroke icons from the design, lines 69–72.
const icons: Record<string, string[]> = {
  shield: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", "M9 12l2 2 4-4"],
  price: ["M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"],
  clock: ["M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z", "M12 7v5l3 2"],
  check: ["M20 6L9 17l-5-5"],
};
</script>

<template>
  <section class="trust" :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation">
    <ul class="container trust-row">
      <li v-for="(point, i) in slice.primary.points" :key="i" class="trust-item">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path v-for="d in icons[point.icon ?? 'check']" :key="d" :d="d" />
        </svg>
        <span>{{ point.label }}</span>
      </li>
    </ul>
  </section>
</template>
