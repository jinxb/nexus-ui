import type { App } from 'vue'

import PmoTab from './src/tab2.vue'

PmoTab.install = function (app: App) {
  app.component(PmoTab.name, PmoTab)
}
PmoTab.name = 'pTab'

export default PmoTab
