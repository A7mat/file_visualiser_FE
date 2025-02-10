<template>
	<Layout>
		<div class="file-browser container my-5 text-left">
			<h2>Available Files:</h2>
			<div class="list-group">
				<FileOption v-for="(file, index) in files" @click="viewFile(file.id)" fileID="file-preview" :key="index">{{ file.name }}</FileOption>
			</div>
		</div>
	</Layout>
</template>

<script setup>
import Layout from "@/components/LayoutCustom.vue";
import FileOption from "@/components/FileOption.vue";
import { useStore } from "@/stores/store.js"
import { ref, onMounted } from "vue";
import { watchEffect } from "vue";

const store = useStore()
const files = ref({})

onMounted(() => {
	files.value = store.getFileNames();
})

watchEffect(() => {
    files.value = store.fileNames;  // Updates automatically when store.fileNames changes
});

// TODO
const viewFile = (fileId) => {
	// store.getFileById(fileId)
}

</script>