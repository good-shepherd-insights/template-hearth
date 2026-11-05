<script setup lang="ts">
import { components } from "~/slices";

const prismic = usePrismic();
const { data: page } = await useAsyncData("homepage", () =>
	prismic.client.getSingle("homepage"),
);
</script>

<template>
	<main>
		<SliceZone :slices="page?.data.slices ?? []" :components="components" />
	</main>
</template>