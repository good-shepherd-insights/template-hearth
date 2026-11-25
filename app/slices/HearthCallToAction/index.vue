<script setup lang="ts">
// Slice component pattern: prismic.io/docs/nuxt.md, "Write Vue components" (its example is a
// "Call to Action" slice). Buttons come from Settings via useSettings (nuxt.md, "Fetch content in
// pages and slices"). Design: project/Main.dc.html lines 140–151.
import type { Content } from "@prismicio/client";

defineProps(getSliceComponentProps<Content.HearthCtaSlice>());

const settings = useSettings();
const cta = useCta();
</script>

<template>
  <section class="section" :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation">
    <div class="container">
      <div class="cta-band">
        <div class="cta-copy">
          <PrismicRichText :field="slice.primary.heading" />
          <PrismicRichText :field="slice.primary.text" />
        </div>
        <div class="hero-actions">
          <a v-if="cta" :href="cta.href" class="btn btn-accent">{{ cta.label }}</a>
          <a v-if="settings?.data.phone" :href="`tel:${settings.data.phone}`" class="btn btn-ghost">{{ settings.data.phone }}</a>
        </div>
      </div>
    </div>
  </section>
</template>
