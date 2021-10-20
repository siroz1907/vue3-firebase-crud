import { createApp } from 'vue'


import App from './App.vue'
import store from './options/store.js';
import router from './options/router.js';


const app=createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
