<script setup lang="ts">
defineProps({
	id: String,
	name: String,
	email: String,
})
</script>

<template>
	<tr>
		<td class="px-4 py-2">{{ id }}</td>
		<td class="px-4 py-2">{{ name }}</td>
		<td class="px-4 py-2">{{ email }}</td>
	</tr>
</template>
