import { describe, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Home from '../views/Home.vue'

vi.mock('/library.png', () => ({
	default: 'mocked-image',
}))

describe('main page', async () => {
	test('should render main page header', () => {
		const wrapper = mount(Home, {
			global: {
				stubs: {
					'router-link': {
						template: '<a><slot /></a>',
					},
				},
			},
		})
		expect(wrapper.text()).toContain('Celowo zepsuty test w ramach zadania "Konfiguracja GitHub Actions CI"')
	})
	test('should render buttons', async () => {
		const wrapper = mount(Home, {
			global: {
				stubs: {
					'router-link': {
						template: '<a><slot /></a>',
					},
				},
			},
		})
		expect(wrapper.text()).toContain('Books')
		expect(wrapper.text()).toContain('Readers')
		expect(wrapper.text()).toContain('Loans')
	})
})
