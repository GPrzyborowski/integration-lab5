<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Header from '../components/Header.vue'
import ReaderRecord from '../components/ReaderRecord.vue'

type User = {
	id: string
	name: string
	email: string
}

const users = ref<User[]>([])
const name = ref('')
const email = ref('')

const getReaders = async () => {
	const res = await fetch('http://localhost:5000/api/get-users')
	const data = await res.json()
	users.value = data
}

const addReader = async (e: Event) => {
	e.preventDefault()
	try {
		await fetch('http://localhost:5000/api/new-user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name: name.value, email: email.value }),
		})
		getReaders()
		name.value = ''
		email.value = ''
	} catch (err) {
		console.error(err)
	}
}

onMounted(getReaders)
</script>

<template>
	<Header text="Readers" />

	<div class="grid grid-cols-1 lg:grid-cols-2 mt-12 md:mt-14 lg:mt-16 px-6 gap-12">
		<div class="mt-12 lg:mt-0 flex justify-center order-1 lg:order-2">
			<form
				@submit.prevent="addReader"
				class="w-full max-w-lg space-y-4 rounded-lg border border-gray-300 bg-gray-100 p-6">
				<div>
					<label class="block text-sm font-medium text-gray-900" for="name"> Name </label>

					<input
						class="mt-1 w-full rounded-lg border-gray-300 bg-white px-4 py-2 focus:border-indigo-500 focus:outline-none"
						id="title"
						type="text"
						placeholder="e.g. John Smith"
						v-model="name" />
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-900" for="email"> Email </label>

					<input
						class="mt-1 w-full rounded-lg border-gray-300 bg-white px-4 py-2 focus:border-indigo-500 focus:outline-none"
						id="author"
						type="text"
						placeholder="e.g. john@domain.com"
						v-model="email" />
				</div>

				<button
					class="block w-full cursor-pointer rounded-lg border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-indigo-600"
					type="submit">
					Add reader
				</button>
			</form>
		</div>

		<div class="order-2 lg:order-1">
			<table class="table-auto w-full overflow-hidden rounded-lg border border-gray-200">
				<thead class="bg-gray-100 text-left">
					<tr>
						<th class="px-4 py-2">ID</th>
						<th class="px-4 py-2">Name</th>
						<th class="px-4 py-2">Email</th>
					</tr>
				</thead>

				<tbody class="[&>tr:nth-child(even)]:bg-gray-100">
					<ReaderRecord v-for="user in users" :key="user.id" :id="user.id" :name="user.name" :email="user.email" />
				</tbody>
			</table>
		</div>
	</div>
</template>
