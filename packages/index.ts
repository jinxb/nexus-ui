import type { App } from 'vue'

import db from './db/db'
import Tab from './tab'
import Tabs from './tabs'
import Table from './table'

import { useTableData } from './utils'

export type NxTableInstance = InstanceType<typeof Table>
export type NxTabInstance = InstanceType<typeof Tab>
export type NxTabsInstance = InstanceType<typeof Tabs>
export type NxTableProps = InstanceType<typeof Table>['$props']
export type NxTabProps = InstanceType<typeof Tab>['$props']
export type NxTabsProps = InstanceType<typeof Tabs>['$props']

import './index.d.ts'

const components = [Tab, Table, Tabs]
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

export { Nxui, db, useTableData }
