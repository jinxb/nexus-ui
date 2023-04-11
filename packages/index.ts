import type { App } from 'vue'

import db from './db/db'
import Tab from './tab'
import Table from './table'

const components = [Tab, Table]
const install = function (app: App) {
  components.forEach((cpn) => {
    app.component(cpn.name, cpn)
  })
}

if (typeof window !== 'undefined') {
  window['NXUI'] = { install }
  window['$db'] = db
  db.open()
}

const Nxui = { install }

export { Nxui, db }
