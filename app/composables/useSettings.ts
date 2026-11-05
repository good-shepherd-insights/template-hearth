// Copied from Prismic's official Nuxt starter:
// github.com/prismicio-community/nuxt-starter-prismic-multi-page/blob/HEAD/app/composables/useSettings.ts
// One shared key so the Settings document is fetched once across every caller
// (prismic.io/docs/nuxt.md, "Fetch content in pages and slices": "When fetching global content,
// use a unique key to ensure the content is fetched only once").
export const useSettings = () => {
  const { client } = usePrismic();
  return useAsyncData("$settings", () => client.getSingle("settings")).data;
};
