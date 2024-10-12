<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script>
// import Preview from './pages/FilePreview.vue'
// import FileBrowser from './pages/FileBrowser.vue'
import { RouterView } from 'vue-router';

export default {
  name: 'App',
  components: {
    // Preview,
    // FileBrowser,
    RouterView
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  /* display: flex; */
  justify-content: center;
}

.dv-canvas-container canvas {
  max-height: 450px;
}
</style>
