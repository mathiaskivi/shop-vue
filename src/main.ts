import { createApp } from 'vue';
import App from './App.vue';
import router from './router/Index';
import store from './store/Index';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'jquery';
import 'popper.js';

createApp(App)
    .use(router)
    .use(store)
    .mount('#app');
