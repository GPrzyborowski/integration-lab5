import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Books from '../views/Books.vue'
import Loans from '../views/Loans.vue'
import Readers from '../views/Readers.vue'

const routes = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/books',
		component: Books,
	},
	{
		path: '/loans',
		component: Loans,
	},
	{
		path: '/readers',
		component: Readers,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
