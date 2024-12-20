import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'material-icons/iconfont/material-icons.css';
import router from './router';

// Create the app instance
const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app')