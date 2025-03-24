// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
				modules: ['@nuxt/icon', '@nuxt/ui', '@nuxt/image'],
				app: {
								head: {
												title: 'Pep\'eat',
												htmlAttrs: {
																lang: 'fr'
												}
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
				}
})