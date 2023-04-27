import type { App } from 'vue'

import NxFilter from './src/filter.vue'

NxFilter.name = 'NxFilter'
NxFilter.install = function (app: App) {
  app.component(NxFilter.name, NxFilter)
}

export default NxFilter
