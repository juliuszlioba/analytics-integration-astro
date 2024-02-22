import { defineConfig } from 'astro/config'
import solid from '@astrojs/solid-js'
//import partytown from '@astrojs/partytown'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
	integrations: [
		solid(),
		// partytown({
		// 	config: {
		// 		debug: true,
		// 		forward: ['dataLayer.push']
		// 	}
		// }),
		tailwind()
	]
})
