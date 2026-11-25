// Copied from Prismic's official Nuxt starter:
// github.com/prismicio-community/nuxt-starter-prismic-multi-page/blob/HEAD/app/composables/useSettings.ts
// One shared key so the Settings document is fetched once across every caller
// (prismic.io/docs/nuxt.md, "Fetch content in pages and slices": "When fetching global content,
// use a unique key to ensure the content is fetched only once").
// On /sample there is no repository to read: the settings are those of the business being shown.
export const useSettings = () => {
  if (useRoute().name === "sample") {
    const sample = useSample();
    return computed(() => (sample.value === null ? undefined : { data: previewOf(sample.value).settings }));
  }
  const { client } = usePrismic();
  return useAsyncData("$settings", () => client.getSingle("settings")).data;
};
