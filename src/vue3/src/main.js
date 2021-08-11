import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'



const app = createApp(App)
// websocketの設定
let ws_scheme = window.location.protocol == "https:" ? "wss://" : "ws://";
// django用・本番用
let locationhost = window.location.host
// vueでの開発用
// let locationhost = '127.0.0.1:8000'
const store_information = new WebSocket( ws_scheme + locationhost + "/ws/store_information/" );
app.config.globalProperties.$store_information = store_information

app.config.compilerOptions.delimiters = ['${', '}']
app.use(store)
app.use(router)
store.$store_information = store_information

app.mount('#app')
