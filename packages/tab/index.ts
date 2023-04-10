import type { App } from 'vue'

import NxTab from './src/tab.vue'

NxTab.name = 'NxTab'
NxTab.install = function (app: App) {
  app.component(NxTab.name, NxTab)
}

export default NxTab
