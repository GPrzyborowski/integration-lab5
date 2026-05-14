import { describe, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Loans from '../views/Loans.vue'

vi.mock('/return.svg', () => ({
	default: 'mocked-image',
}))

globalThis.fetch = vi.fn(() =>
	Promise.resolve({
		json: () =>
			Promise.resolve([
				{
					id: 1,
					title: 'Test book',
					name: 'Gabriel Przyborowski',
					loan_date: '01.01.2026',
					return_date: null,
				},
			]),
	}),
) as unknown as typeof fetch

describe('loans page', async () => {
	test('should render proper table headers', () => {
		const wrapper = mount(Loans)
		expect(wrapper.text()).toContain('Book')
		expect(wrapper.text()).toContain('Borrower')
		expect(wrapper.text()).toContain('Loan date')
		expect(wrapper.text()).toContain('Return date')
	})
	test('should render form inputs', () => {
		const wrapper = mount(Loans)
		const inputs = wrapper.findAll('input')
		expect(inputs.length).toBe(2)
	})
})
