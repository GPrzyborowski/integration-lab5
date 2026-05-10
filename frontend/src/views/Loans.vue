<script setup lang="ts">
import Header from '../components/Header.vue'
import LoanRecord from '../components/LoanRecord.vue'
import { onMounted, ref } from 'vue'

type Loan = {
	id: number
	title: string
	name: string
	loan_date: string
	return_date: string
}

const loans = ref<Loan[]>([])
const borrowerId = ref<number>()
const bookId = ref<number>()

const renderLoans = async () => {
	const res = await fetch('http://localhost:5000/api/get-loans')
	const data = await res.json()
	loans.value = data
}

const returnLoan = async (id: number) => {
	try {
		await fetch(`http://localhost:5000/api/end-loan/${id}`, {
			method: 'PUT',
		})
		renderLoans()
	} catch (err) {
		console.error(err)
	}
}

const newLoan = async (e: Event) => {
	e.preventDefault()
	try {
		await fetch('http://localhost:5000/api/new-loan', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ borrowerId: borrowerId.value, bookId: bookId.value }),
		})
		renderLoans()
		borrowerId.value = undefined
		bookId.value = undefined
	} catch (err) {
		console.error(err)
	}
}

onMounted(renderLoans)
</script>

<template>
	<Header text="Loans" />
	<div class="grid grid-cols-1 lg:grid-cols-2 mt-12 md:mt-14 lg:mt-16 px-6">
		<div>
			<table class="table-auto w-full border border-gray-200 rounded-lg overflow-hidden">
				<thead class="bg-gray-100 text-left">
					<tr>
						<th class="px-4 py-2">Book</th>
						<th class="px-4 py-2">Borrower</th>
						<th class="px-4 py-2">Loan date</th>
						<th colspan="2" class="px-4 py-2">Return date</th>
					</tr>
				</thead>

				<tbody class="[&>tr:nth-child(even)]:bg-gray-100">
					<LoanRecord
						v-for="loan in loans"
						:key="loan.id"
						:book="loan.title"
						:borrower="loan.name"
						:loanDate="new Date(loan.loan_date).toLocaleDateString('pl-PL')"
						:returnDate="
							loan.return_date == null ? 'Nie zwrocono' : new Date(loan.return_date).toLocaleDateString('pl-PL')
						"
						:id="loan.id"
						:onReturn="returnLoan" />
				</tbody>
			</table>
		</div>
		<div class="max-w-9/10 mx-auto mt-12 lg:col-span-1">
			<form
				@submit.prevent="newLoan"
				class="mx-auto max-w-md space-y-4 rounded-lg border border-gray-300 bg-gray-100 p-6">
				<div>
					<label class="block text-sm font-medium text-gray-900" for="name">Borrower ID</label>

					<input
						class="mt-1 w-full bg-white px-4 py-2 rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none"
						id="title"
						type="text"
						placeholder="e.g. 1"
						v-model="borrowerId" />
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-900" for="email">Book ID</label>

					<input
						class="mt-1 w-full bg-white px-4 py-2 rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none"
						id="author"
						type="text"
						placeholder="e.g. 2"
						v-model="bookId" />
				</div>

				<button
					class="block w-full rounded-lg border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-indigo-600 cursor-pointer"
					type="submit">
					New loan
				</button>
			</form>
		</div>
	</div>
</template>
