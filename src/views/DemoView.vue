<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import tab from '../../packages/tab/src/tab.vue';
import nxTable from '../../packages/table/index';
import type { IScreenData } from '../../packages/tab/src/types';
import type { ITableTh } from '../../packages/table/src/types';

const page = reactive({
  select: '',
  inputVal1: '',
  inputVal2: '',
  inputVal3: '',
  inputVal4: '',
  inputVal5: ''
})
const btn1 = () => {
    console.log('args');
}
const funBtns = reactive([
  {
    name: '按钮1按钮1按钮1',
    show: true,
    cb: () => btn1
  },
  {
    name: '按钮2',
    show: false,
    cb: () => btn1
  }
])

const screenData = reactive([
  {
    label: '选择',
    type: 'select',
    key: 'select',
    placeholder: '111',
    options: [
      {
        label: '1',
        value: '1'
      },
      {
        label: '2',
        value: '2'
      }
    ] 
  },
  {
    label: '日期',
    type: 'date',
    key: 'date'
  },
  {
    label: 'D1M仓库名称',
    type: 'input',
    key: 'inputVal1'
  }
]) as IScreenData[]
const filterChange = () => {
  console.log(page, '----------------------------------')
}

const table = ref(null)
const tableData = reactive({
  th: [
    { field: 'checkbox', type: 'checkbox'},
    { field: 'id', title: '序号' },
    { field: 'name', title: '序号2' },
    { field: 'role', title: '序号3' },
    { field: 'age', title: '序号4' },
  ] as ITableTh[],
  tr: [],
  showSum: true,
  // showPage: true,
  page: {
    pageNum: 0,
    pageSize: 50
  },
  total: 999,
  loading: false,
  cacheKey: 'test'
})
function scrollLoad(params) {
  console.log(params, '----------')
  if (tableData.loading) return
  getList()
}
async function getList() {
  tableData.loading = true
  const data = await findList(20) as []
  tableData.tr = [
    ...tableData.tr,
    ...data
  ]
  tableData.total = tableData.tr.length
  console.log(tableData.tr);
  
  tableData.loading = false
  table.value.tableEmit('updateData')
}
function findList(size) {
  return new Promise(resolve => {
    setTimeout(() => {
      var list = []
      for (var index = 0; index < size; index++) {
        list.push({
          id: 100000 + index,
          name: 'test' + index,
          role: 'developer',
          age: 10,
          date: '2019-05-01',
          address: 'address abc' + index
        })
      }
      resolve(list)
    }, 250)
  })
}
onMounted(() => {
  getList()
})
</script>
<template>
  <div class="about">
    <tab @filterChange="filterChange" :btnList="funBtns" :screenData="screenData" v-model:page="page">
    </tab>
    <div style="height: calc(100% - 140px)">
      <nx-table @scrollLoad="scrollLoad" ref="table" v-bind="tableData" class="table">
    </nx-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
</style>
