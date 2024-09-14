import {createApp} from 'vue'
import '@/assets/css/reset.less'
import '@/assets/css/main.less'
import App from './App.vue'
import router from "@/router/index.js";
import {createPinia} from "pinia";
import piniaPersist from "pinia-plugin-persist";

const pinia = createPinia()
pinia.use(piniaPersist);

createApp(App).use(router).use(pinia).mount('#app')
