import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/lib/theme-chalk/index.css'

import { Nxui } from '@jinxb/nexus-ui'
import '@jinxb/nexus-ui/style.css'

import { Rank } from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import './assets/style.scss'
const app = createApp(App)

const icons = { Rank }
for (const [key, component] of Object.entries(icons)) {
  app.component(key, component)
}
app.use(VXETable)
app.use(ElementPlus, { locale })
app.use(Nxui)
app.use(createPinia())
app.use(router)

app.mount('#app')
