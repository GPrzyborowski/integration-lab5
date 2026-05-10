<script setup lang="ts">
type Book = {
	id: number
	title: string
	author: string
}
import Header from '../components/Header.vue'
import Book from '../components/Book.vue'
import { onMounted, ref } from 'vue'
const books = ref<Book[]>([])
const title = ref('')
const author = ref('')

const renderBooks = async () => {
	const res = await fetch('http://localhost:5000/api/get-books')
	const data = await res.json()
	books.value = data
}

onMounted(renderBooks)

const addBookHandler = async (e: Event) => {
	e.preventDefault()
	try {
		await fetch('http://localhost:5000/api/new-book', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title: title.value, author: author.value }),
		})
		renderBooks()
		title.value = ''
		author.value = ''
	} catch (err) {
		console.error(err)
	}
}

const deleteBookHandler = async (id: number) => {
	try {
		const res = await fetch(`http://localhost:5000/api/delete-book/${id}`, {
			method: 'DELETE',
		})
		if (res.ok) {
			renderBooks()
		}
	} catch (err) {
		console.error(err)
	}
}
</script>

<template>
	<Header text="Books" />

	<div class="max-w-9/10 mx-auto mt-12 lg:col-span-1">
		<form
			@submit.prevent="addBookHandler"
			class="mx-auto max-w-md space-y-4 rounded-lg border border-gray-300 bg-gray-100 p-6">
			<div>
				<label class="block text-sm font-medium text-gray-900" for="name">Title</label>

				<input
					class="mt-1 w-full bg-white px-4 py-2 rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none"
					id="title"
					type="text"
					placeholder="e.g. The Hobbit"
					v-model="title" />
			</div>

			<div>
				<label class="block text-sm font-medium text-gray-900" for="email">Author</label>

				<input
					class="mt-1 w-full bg-white px-4 py-2 rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none"
					id="author"
					type="text"
					placeholder="e.g. J.R.R. Tolkien"
					v-model="author" />
			</div>

			<button
				class="block w-full rounded-lg border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-indigo-600 cursor-pointer"
				type="submit">
				Add book
			</button>
		</form>
	</div>
	<div class="px-8 mt-12 grid md:col-span-2 gap-6 [grid-template-columns:repeat(auto-fit,minmax(200px,300px))]">
		<Book v-for="book in books" :key="book.id" :title="book.title" :author="book.author" :id="book.id" :deleteHandler="deleteBookHandler" />
	</div>
</template>
