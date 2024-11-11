<template>
	<Layout>
		<div class="file-browser container my-5 text-left">
			<h2>Available Files:</h2>
			<div class="list-group text-center">
				<FileOption v-for="(file, index) in files" :fileID="file.href" :key="index">{{ file.name }}</FileOption>
			</div>
		</div>
	</Layout>
</template>

<script setup>
import Layout from "@/components/LayoutCustom.vue";
import FileOption from "@/components/FileOption.vue";
import { useStore } from "@/stores/store.js"
import { ref, onMounted } from "vue";

const store = useStore()
const files = ref({})

onMounted(() => {
	store.getFileNames()
	files.value = store.fileNames
})
</script>