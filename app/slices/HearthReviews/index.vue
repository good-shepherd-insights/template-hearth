<script setup lang="ts">
// Slice component pattern: prismic.io/docs/nuxt.md, "Write Vue components".
// Group loop: prismic.io/docs/fields/repeatable-group.md. Design: project/Main.dc.html lines 107–121.
import type { Content } from "@prismicio/client";

defineProps(getSliceComponentProps<Content.HearthReviewsSlice>());
</script>

<template>
  <section class="section" :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation">
    <div class="container">
      <div class="section-head section-head-center">
        <p v-if="slice.primary.eyebrow" class="eyebrow">{{ slice.primary.eyebrow }}</p>
        <PrismicRichText :field="slice.primary.heading" />
      </div>
      <div class="reviews-grid">
        <figure v-for="(review, i) in slice.primary.reviews" :key="i" class="card review">
          <!-- `rating` is a Number field constrained to 1–5 in the model (`--min 1 --max 5`). -->
          <span v-if="review.rating" class="stars" role="img" :aria-label="`${review.rating} out of 5 stars`">
            {{ "★".repeat(review.rating) }}
          </span>
          <blockquote><PrismicRichText :field="review.quote" /></blockquote>
          <figcaption>
            <strong>{{ review.name }}</strong>
            <template v-if="review.detail">, {{ review.detail }}</template>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
