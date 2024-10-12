<template>
	<Layout>
		<div class="file-browser container my-5">
			<div class="list-group">
				<FileOption v-for="(file, index) in files" :fileID="file.href" :key="index">{{ file.name }}</FileOption>
			</div>
		</div>
	</Layout>
</template>

<script setup>
import Layout from "@/components/LayoutCustom.vue";
import FileOption from "@/components/FileOption.vue";

const files = [
	{name: 'File 1', href: 'file-preview'},
	{name: 'File 2', href: 'file-preview'},
	{name: 'File 3', href: 'file-preview'}
	]
</script>