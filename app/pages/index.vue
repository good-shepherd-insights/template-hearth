<script setup lang="ts">
import { components } from "~/slices";

const prismic = usePrismic();
const { data: page } = await useAsyncData("homepage", () =>
	prismic.client.getSingle("homepage"),
);
// The business name is the title already; a page of its own words replaces it.
useSeoMeta({
	title: () => page.value?.data.meta_title || undefined,
	description: () => page.value?.data.meta_description || undefined,
	ogImage: () => page.value?.data.meta_image?.url || undefined,
});
</script>

<template>
	<main>
		<SliceZone :slices="page?.data.slices ?? []" :components="components" />
	</main>
</template>