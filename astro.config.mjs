import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://yourdomain.com', // Replace with your actual domain
  vite: {
    define: {
      'import.meta.env.MAPTILER_API_KEY': JSON.stringify(process.env.MAPTILER_API_KEY),
      'import.meta.env.AIRTABLE_API_KEY': JSON.stringify(process.env.AIRTABLE_API_KEY),
      'import.meta.env.AIRTABLE_BASE_ID': JSON.stringify(process.env.AIRTABLE_BASE_ID),
    },
  },
});
