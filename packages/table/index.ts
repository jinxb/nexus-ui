import type { App } from 'vue'

import NxTable from './src/table.vue'

NxTable.name = 'NxTable'
NxTable.install = function (app: App) {
  app.component(NxTable.name, NxTable)
}
export default NxTable
