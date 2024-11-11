<template>
	<Layout>
		<p class="h2 my-5">
			### This Landing page iss under construction ###
		</p>

		<section class="text-left container ">
			<ul class="h4">Next To-Dos:
				<li class="h5 my-3">Replace the dummy <em>Files View</em> page with actual (test) files page</li>
				<li class="h5">Once user chooses a file, show the corresponding file visualisation</li>
				<li class="h5">Eventually implement the Backend and connect it via REST API</li>
				<li class="h5">
					<ul>Add two separate <em>File View</em> pages: 
						<li class="h6">1. Test Page: has the dummy files</li>
						<li class="h6">2. Actual Page: only works if the backend is connected, then it actually analyses the files and sends back JSON in a RESTful manner</li>
					</ul> </li>
			</ul>
		</section>
	</Layout>
</template>

<script setup>
import Layout from '@/components/LayoutCustom.vue';

</script>