import type { App } from 'vue'
import NxTabs from './src/tabs.vue'

NxTabs.name = 'NxTabs'
NxTabs.install = function (app: App) {
  app.component(NxTabs.name, NxTabs)
}

export default NxTabs
