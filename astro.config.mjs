// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
	integrations: [robotsTxt()],
	site: 'https://devsandoval.me',
	vite: {
		plugins: [tailwindcss()],
	},
	i18n: {
		locales: ['es', 'en'],
		defaultLocale: 'es',
		routing: {
			prefixDefaultLocale: false,
			fallbackType: 'rewrite',
		},
		fallback: {
			en: 'es',
		},
	},
});
