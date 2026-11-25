// Prismic module setup: prismic.io/docs/nuxt.md, "Set up a Nuxt website" → Prismic CLI step 3
// ("Configure the @nuxtjs/prismic module"), the exact shape `prismic init` writes.
import prismicConfig from "./prismic.config.json";

export default defineNuxtConfig({
  // Written by `nuxi init` (Nuxt guide step 1).
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // Global stylesheet: nuxt.com/docs/4.x/getting-started/styling ("The CSS Property"):
  // `css: ['~/assets/css/main.css']`.
  css: ["~/assets/css/main.css"],

  // prismic.io/docs/nuxt.md step 3: `modules: ["@nuxtjs/prismic"]`.
  modules: ["@nuxtjs/prismic"],

  // A build made for embedding /sample ships that page alone, without the data of others.
  experimental: { payloadExtraction: process.env.SAMPLE_ONLY === undefined },

  // A client's site does not ship the preview page, and a preview ships nothing else.
  hooks: {
    "pages:extend": (pages) => {
      const kept = pages.filter(({ name }) => (name === "sample") === (process.env.SAMPLE_ONLY !== undefined));
      pages.splice(0, pages.length, ...kept);
    },
  },
  nitro: process.env.SAMPLE_ONLY === undefined ? {} : { prerender: { routes: ["/sample"], crawlLinks: false } },

  // Which version of this template /sample shows, so a site is built from that one.
  runtimeConfig: { public: { commit: process.env.TEMPLATE_COMMIT ?? "" } },

  prismic: {
    // Not on a build made for embedding /sample: it is a third-party script, for editors only.
    toolbar: process.env.SAMPLE_ONLY === undefined,
    // `endpoint` is "A Prismic repository name", defaulting to `repositoryName` from
    // prismic.config.json (prismic.io/docs/technical-reference/nuxtjs-prismic/v5.md, PrismicModule).
    // A template is built once per client, each pointing at that client's own repository, so the
    // name comes from the build environment: process environment variables are "accessible within
    // your nuxt.config file and modules" at build time (nuxt.com/docs/4.x/directory-structure/env).
    endpoint: process.env.PRISMIC_REPOSITORY_NAME || prismicConfig.repositoryName,
    clientConfig: {
      // prismic.io/docs/nuxt.md step 3: `routes: prismicConfig.routes`.
      routes: prismicConfig.routes,
    },
  },
});
