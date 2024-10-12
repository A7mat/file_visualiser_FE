<template>
	<router-link class="list-group-item list-group-item-action" :to="fileID"> <slot></slot> </router-link>
</template>

<script setup>
	const props = defineProps({
		fileName: String,
		fileID: String,
	})

</script>