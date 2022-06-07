import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import router from './router'
import App from './App.vue'
import store from './store'
import '@/styles/index.css'
import '@/plugins/figlet'

const app = createApp(App)
app.use(router)
app.use(Antd)
app.use(store)

app.config.productionTip = false
app.mount('#app')
