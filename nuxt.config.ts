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

  prismic: {
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
