import {createApp} from 'vue'
import '@/assets/css/reset.less'
import '@/assets/css/main.less'
import App from './App.vue'
import router from "@/router/index.js";
import {createPinia} from "pinia";
import piniaPersist from "pinia-plugin-persist";
import {install as useAntd} from './useAntd.js'

const pinia = createPinia()
pinia.use(piniaPersist);

const app = createApp(App)

app.use(router).use(pinia)
app.use(useAntd)

app.mount('#app')
