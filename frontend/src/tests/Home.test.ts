import { describe, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Home from '../views/Home.vue'

vi.mock('/library.png', () => ({
	default: 'mocked-image',
}))

describe('main page', async () => {
	test('should render main page header', () => {
		const wrapper = mount(Home)
		expect(wrapper.text()).toContain('Simplified library management system')
	})
	test('should render buttons', async () => {
		const wrapper = mount(Home)
        expect(wrapper.text()).toContain('Books')
        expect(wrapper.text()).toContain('Readers')
        expect(wrapper.text()).toContain('Loans')
	})
})
