import ElementPlus from 'element-plus';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

const app = createApp(App);
app.use(createPinia());
app.use(ElementPlus);
app.mount('#root');
