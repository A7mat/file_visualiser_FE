import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore('store', () => {
	const fileNames = ref({})

	// Dummy function to call list of file names
	// TODO: replace by axios once backend is ready
	function getFileNames() {
		fileNames.value =  [
			{name: 'Test file 1', href: 'file-preview'},
			{name: 'Test file 2', href: 'file-preview'},
			{name: 'Test file 3', href: 'file-preview'},
			{name: 'Test file 4', href: 'file-preview'},
			{name: 'Test file 5', href: 'file-preview'},
			{name: 'Test file 6', href: 'file-preview'},
			{name: 'Test file 7', href: 'file-preview'},
			{name: 'Test file 8', href: 'file-preview'},
			{name: 'Test file 9', href: 'file-preview'},
			{name: 'Test file 10', href: 'file-preview'},
		]
		return fileNames;
	}

	return { fileNames, getFileNames }
})