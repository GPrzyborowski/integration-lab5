import { describe, test, expect, vi, type Mock } from 'vitest'
import { mount } from '@vue/test-utils'
import Books from '../views/Books.vue'

vi.mock('/bin.svg', () => ({
	default: 'mocked-image',
}))

globalThis.fetch = vi.fn(() =>
	Promise.resolve({
		json: () =>
			Promise.resolve([
				{
					id: 1,
					title: 'Test book',
					author: 'Test author',
				},
			]),
	}),
) as Mock

describe('books page', async () => {
	test('should contain new book form', async () => {
		const wrapper = mount(Books)
		const labels = wrapper.findAll('label')
		expect(labels[0].text()).toBe('Title')
		expect(labels[1].text()).toBe('Author')
	})
	test('should contain submit button', async () => {
		const wrapper = mount(Books)
		expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
	})
})
