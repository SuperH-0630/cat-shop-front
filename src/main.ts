import { createApp } from 'vue'
import App from './App.vue'
import pinia from '@/store'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '@/assets/styles/reset.scss'
import '@/assets/styles/scrollbar.scss'
import '@/assets/styles/common.scss'
import '@/assets/styles/background.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')