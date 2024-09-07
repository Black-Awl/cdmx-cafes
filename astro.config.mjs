// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import astroI18n from "astro-i18n-aut/integration";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    astroI18n({
      defaultLanguage: "en",
      supportedLanguages: ["en", "es"],
      translationDirectory: "./src/locales",
    }),
  ],
});
