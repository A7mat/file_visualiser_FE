import { createRouter, createWebHistory } from "vue-router";
import FileBrowser from "@/pages/FileBrowser.vue";
import FilePreview from "@/pages/FilePreview.vue";
import HomePage from "@/pages/HomePage.vue";

const routes = [
	{path: '/', name: 'home', component: HomePage},
	{path: '/file-browser', name: 'fileBrowser', component: FileBrowser},
	{path: '/file-preview', name: 'filePreview', component: FilePreview}
	]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router