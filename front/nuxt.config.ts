// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	modules: ['@nuxt/icon', '@nuxt/ui', '@nuxt/image', '@pinia/nuxt'],
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
		enabled: true
	},
	runtimeConfig: {
		public: {
			restaurantApi: process.env.RESTAURANT_API ?? 'http://localhost:3101/restaurants',
			mediaApi: process.env.MEDIA_API ?? 'http://localhost:3102/media'
		}
	}
})