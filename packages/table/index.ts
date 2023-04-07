import NxTable from './src/table.vue'

// eslint-disable-next-line space-before-function-paren
NxTable.install = function (Vue) {
  Vue.component(NxTable.name, NxTable)
}

export default NxTable
