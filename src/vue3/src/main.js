import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import axios from 'axios'
import VueAxios from "vue-axios"

const app = createApp(App)

// websocketの設定
let ws_scheme = window.location.protocol == "https:" ? "wss://" : "ws://";
// django用・本番用
// let locationhost = window.location.host
// vueでの開発用
let locationhost = '127.0.0.1:9000'
// const store_information = new WebSocket( ws_scheme + locationhost + "/ws/store_information/" );
const menu_list = new WebSocket( ws_scheme + locationhost + "/ws/menu_list/" );
// app.config.globalProperties.$store_information = store_information
app.config.globalProperties.$menu_list = menu_list

// axios設定
axios.defaults.baseURL = 'http://' + location.hostname + ':9000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

app.config.compilerOptions.delimiters = ['${', '}']
app.use(store)
app.use(router)
app.use(VueAxios, axios);
// store.$store_information = store_information
store.$menu_list = menu_list

app.mount('#app')