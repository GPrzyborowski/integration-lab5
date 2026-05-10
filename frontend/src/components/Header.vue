<script setup lang="ts">
defineProps({
    text: String
})
</script>

<template>
    <h1 class="pt-16 md:pt-20 lg:pt-24 text-xl md:text-2xl lg:text-3xl text-center font-bold text-indigo-600">{{ text }}</h1>
</template>