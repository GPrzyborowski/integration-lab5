<script setup lang="ts">
type Props = {
	book: string
	borrower: string
	loanDate: string
	returnDate: string
	id: number
	onReturn: (id: number) => void
}
const props = defineProps<Props>()
</script>

<template>
	<tr>
		<td class="px-4 py-2">{{ book }}</td>
		<td class="px-4 py-2">{{ borrower }}</td>
		<td class="px-4 py-2">{{ loanDate }}</td>
		<td class="px-4 py-2">{{ returnDate }}</td>
		<td class="px-4 py-2">
			<button class="cursor-pointer"><img class="min-w-[24px]" src="/return.svg" alt="return icon" @click="onReturn(id)" /></button>
		</td>
	</tr>
</template>
