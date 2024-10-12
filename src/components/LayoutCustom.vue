<template>
	<div>
		<!-- TODO: create header componant -->
		<nav class="header navbar navbar-expand-lg navbar-light bg-light">
			<router-link class="navbar-brand" to="/">Data Visualiser</router-link>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
				<li class="nav-item active">
					<router-link class="nav-link" to="/file-browser">Files View <span class="sr-only">(current)</span></router-link>
				</li>
				</ul>
			</div>
		</nav>

		<!-- Content of the page should be displayed in this slot -->
		<slot></slot>

		<!-- TODO: create footer componant -->
		<div class="footer"></div>
	</div>
</template>

<script setup>

</script>