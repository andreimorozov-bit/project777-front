import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import './index.css';
import router from './router';
import HighchartsVue from 'highcharts-vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(HighchartsVue);

app.mount('#app');
