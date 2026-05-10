<script setup lang="ts">
import Header from '../components/Header.vue'
</script>

<template>
	<Header text="Simplified library management system" />
	<img src="/library.png" alt="shelf with books" class="max-w-sm md:max-w-md lg:max-w-2xl mx-auto mt-12" />
	<div class="flex flex-1 items-center justify-center mt-24">
		<div class="flex flex-col md:flex-row gap-8 justify-center">
			<router-link
				to="/books"
				class="rounded-lg border border-indigo-600 bg-indigo-600 px-12 py-3 text-white text-center transition-colors duration-200 hover:bg-transparent hover:text-indigo-600">
				Books
			</router-link>
			<router-link
				to="/readers"
				class="rounded-lg border border-indigo-600 bg-indigo-600 px-12 py-3 text-white text-center transition-colors duration-200 hover:bg-transparent hover:text-indigo-600">
				Readers
			</router-link>

			<router-link
				to="/loans"
				class="rounded-lg border border-indigo-600 bg-indigo-600 px-12 py-3 text-white text-center transition-colors duration-200 hover:bg-transparent hover:text-indigo-600">
				Loans
			</router-link>
		</div>
	</div>
</template>
