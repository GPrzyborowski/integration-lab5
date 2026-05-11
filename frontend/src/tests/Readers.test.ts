import { describe, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Readers from '../views/Readers.vue'

globalThis.fetch = vi.fn(() =>
	Promise.resolve({
		json: () =>
			Promise.resolve([
				{
					id: '1',
					name: 'Gabriel Przyborowski',
					email: 'gprzyborowski@test.com',
				},
			]),
	}),
) as unknown as typeof fetch

describe('readers page', async () => {
	test('should render mocked user data', async () => {
		const wrapper = mount(Readers)
		await new Promise(resolve => setTimeout(resolve, 0))
		expect(wrapper.text()).toContain('Gabriel Przyborowski')
		expect(wrapper.text()).toContain('gprzyborowski@test.com')
	})
	test('should render input placeholders', () => {
		const wrapper = mount(Readers)
		const inputs = wrapper.findAll('input')
		expect(inputs[0].attributes('placeholder')).toBe('e.g. John Smith')
		expect(inputs[1].attributes('placeholder')).toBe('e.g. john@domain.com')
	})
})
