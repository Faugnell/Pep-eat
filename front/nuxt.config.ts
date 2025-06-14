// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	modules: ['@nuxt/icon', '@nuxt/ui', '@nuxt/image', '@pinia/nuxt', 'nuxt-lodash'],
	app: {
		head: {
			title: 'Pep\'eat',
			htmlAttrs: {
				lang: 'fr'
			},
			viewport: 'width=device-width, initial-scale=1.0',
			link: [
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Zain&display=swap'
				},
				{
					rel: 'icon',
					type: 'image/x-icon',
					href: '/favicons/favicon_16.ico'
				}
			]
		}
	},
	css: [
		'~/assets/css/main.css'
	],
	vite: {
		plugins: [
			tailwindcss()
		]
	},
	ui: {
		theme: {
			colors: ['primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'error']
		}
	},
	compatibilityDate: '2024-11-01',
	devtools: {
		enabled: false
	},
	runtimeConfig: {
		public: {
			API_NOTIFICATION_SERVICE_HOST: process.env.API_NOTIFICATION_SERVICE_HOST,
			API_NOTIFICATION_SERVICE_PORT: process.env.API_NOTIFICATION_SERVICE_PORT
		}
	}
})