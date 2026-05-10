<script setup lang="ts">
type Props = {
	title: String
	author: String
    id: number
	deleteHandler: (id: number) => void
}
const props = defineProps<Props>()
</script>

<template>
	<div class="w-2xs">
		<article
			class="relative rounded-lg border border-gray-100 bg-white p-4 shadow-xs transition hover:shadow-lg sm:p-6">
			<button class="absolute right-4 w-5 cursor-pointer" @click="props.deleteHandler(props.id)">
				<img src="/bin.svg" alt="trash icon" />
			</button>
			<span class="inline-block rounded-sm bg-indigo-600 py-2 px-4 text-white">
				<p>ID: {{ id }}</p>
			</span>

			<h3 class="mt-2 text-lg font-medium text-gray-900">{{ props.title }}</h3>

			<p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">{{ props.author }}</p>
		</article>
	</div>
</template>
