<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import type { IScreenData } from '../../packages/tab/src/types';
import type { ITableTh } from '../../packages/table/src/types';
import tabA from '../../packages/tab/src/tab.vue';
import NxTabs from '../../packages/tabs/src/tabs.vue';
import NxTable from '../../packages/table/src/table.vue';
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
const tabs = [
  {
    name: '标签a',
    label: '标签a'
  },
  {
    name: '标签b',
    label: '标签b'
  }
]
const funBtns = reactive([
  {
    name: '按钮1按钮1按钮1',
    show: false,
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
    label: '渠道商品编码',
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
    label: 'D1M商品编码',
    type: 'date',
    key: 'date'
  },
  {
    label: 'D1M仓库名称',
    type: 'input',
    key: 'inputVal1'
  },
  {
    label: 'D1M仓库名称2',
    type: 'input',
    key: 'inputVal1'
  },
  {
    label: 'D1M仓库名称3',
    type: 'input',
    key: 'inputVal1'
  },
  {
    label: 'D1M仓库名称4',
    type: 'input',
    key: 'inputVal1'
  }
]) as IScreenData[]
const filterChange = () => {
  console.log(page, '----------------------------------')
}
type NxTableProps = InstanceType<typeof NxTable>["$props"];
const table = ref(null)
const tableData: NxTableProps = reactive({
  th: [] as ITableTh[],
  tr: [],
  showSum: true,
  // showPage: true,
  page: {
    pageNum: 0,
    pageSize: 50
  },
  operateColumn: true,
  operateFixed: true,
  operateWidth: '120',
  total: 999,
  loading: false
})

const setData = (tab: string) => {
  let flag = tabs[0].name
  const th = [
    { field: 'checkbox', width: 50, type: 'checkbox'},
    { field: 'id', title: '序号', handleClickShow: false },
    { field: 'name', title: '序号2', show: tab === flag },
    { field: 'role', title: '序号3' },
    { field: 'age', title: '序号4' },
  ] as ITableTh[]
  tableData.th = th
  tableData.cacheKey = 'Nx-table' + tab
}
setData(tabs[0].name)
function scrollLoad(params) {
  console.log(params, '----------')
  if (tableData.loading) return
  getList()
}
async function getList() {
  tableData.loading = true
  const data = await findList(30) as []
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
const handleChange = (name) => {
  setData(name)
}
const handleClick = (...args) => {
  console.log(args, '----------------');
}
onMounted(() => {
  getList()
})
</script>
<template>
  <div class="about">
    <nx-tabs :data="tabs" @change="handleChange">
    </nx-tabs>
    <tab-a @filterChange="filterChange" :btnList="funBtns" :screenData="screenData" v-model:page="page">
      <template #search_right>
        <el-button class="btn" type="primary" size="mini" >清空</el-button>
      </template>
    </tab-a>
    <div style="height: calc(100% - 140px - 40px)">
      <nx-table @scrollLoad="scrollLoad" ref="table" v-bind="tableData" @handleClick="handleClick" class="table">
        <template #operate_slot="{scope}">
          <div>
            <button @click="handleClick(scope)">按钮</button>
          </div>
        </template>
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
