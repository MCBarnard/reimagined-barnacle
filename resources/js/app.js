import './bootstrap';
import '../scss/app.scss';
import * as Vue from 'vue';
import App from "./App.vue";
import router from './Routes/index';
import store from './Store/index';
import axios from 'axios';

const app = Vue.createApp(App);

// Create $axios to reference when using axios
app.config.globalProperties.$axios = axios;

app.use(router);
app.use(store);

app.mount('#app');
