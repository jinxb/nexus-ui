<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import type { NxTableProps, ITableTh, NxTableInstance }
  from '@jinxb/nexus-ui';
import { useTableData } from '../../packages/utils';
import NxTable from '../../packages/table/src/table.vue';

import { tabs, page, screenData, funBtns } from './config';


const tabVal = ref(tabs[0].name) // 当前页签
// 切换页签触发的事件
const handleTabChange = (name) => {
  tabVal.value = name
  setTh(name)
  getList(true)
}

// 修改表单触发的事件
const filterChange = () => {
  console.log('修改表单触发的事件')
}

/**
 * 表格配置
 * @table 绑定表格ref
 * @tableData 表格配置项
 * @setTh 初始化表头数据
 * @getList 初始化表格行数据
 * @scrollLoad 下拉加载
 */
const table = ref<NxTableInstance>()
let getList: (flag?: boolean) => void
// 表格配置
const tableData: NxTableProps = reactive({
  th: [] as ITableTh[],
  tr: [],
  showSum: false,
  toolBar: {
    forms: [
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
        label: '商品编码',
        type: 'date',
        key: 'date'
      }
    ],
    toolbarShow: true,
    print: true,
    zoom: true,
    import: true,
    export: true,
    refresh: { query: (...status) => { getList(true); console.log(status) } }
  },
  attributes: {
    'span-method': colspanMethod,
    'checkbox-config': {
      'reserve': true
    },
    'row-config': {
      keyField: 'id'
    }
  },
  page: {
    current: 1,
    size: 50,
    pageSizes: [10, 20, 100, { label: '大量数据', value: 1000 }]
  },
  showPage: true,
  operateColumn: true,
  operateFixed: true,
  operateWidth: 150,
  total: 999,
  loading: true
})

const { getListData, searchEvent, scrollLoad } = useTableData(table, tableData, page, ({ current, size }) => findList(current, size), tabVal)
getList = (flag) => { getListData(flag) }

const setTh = (tab: string) => {
  const th = [
    { field: 'checkbox', width: 50, type: 'checkbox', fixed: 'left', },
    { field: 'id', title: '编号', handleClickShow: false },
    { field: 'name', title: '姓名', show: tab === tabs[0].name },
    { field: 'role', title: '角色' },
    { field: 'age', title: '年龄9' },
    { field: 'age', title: '年龄8' },
    { field: 'age', title: '年龄7' },
    { field: 'age', minWidth: 50, title: '年龄6' },
    { field: 'age', title: '年龄5' },
    { field: 'age', title: '年龄8' },
    // { field: 'age', title: '年龄7' },
    // { field: 'age', title: '年龄6' },
    // { field: 'age', title: '年龄5' },
    // { field: 'age', title: '年龄8' },
    // { field: 'age', title: '年龄7' },
    // { field: 'age', title: '年龄6' },
    // { field: 'age', title: '年龄5' },
    // { field: 'age', title: '年龄8' },
    // { field: 'age', title: '年龄7' },
    // { field: 'age', title: '年龄6' },
    // { field: 'age', title: '年龄5' },
    // { field: 'age', title: '年龄5' },
    // { field: 'age', title: '年龄5' },
    // { field: 'age', title: '年龄5' },
  ] as ITableTh[]
  tableData.th = th
  tableData.cacheKey = 'Nx-table' + tab
}
setTh(tabVal.value)


function findList(current, size) {
  console.log('调用了！');

  return new Promise(resolve => {
    setTimeout(() => {
      var list = []
      for (var index = 0; index < size; index++) {
        list.push({
          id: 100000 + current + index,
          name: 'admin' + index,
          role: '前端开发',
          age: 10 + index,
        })
      }
      resolve({
        total: 200,
        records: list
      })
    }, 100)
  })
}

function colspanMethod({ _rowIndex, columnIndex }) {
  // if (_rowIndex === 0) {
  //   if (columnIndex === 3) {
  //     return { rowspan: 3, colspan: 1 }
  //   }
  // } else if (_rowIndex === 1 || _rowIndex === 2) {
  //   if (columnIndex === 3) {
  //     return { rowspan: 1, colspan: 0 }
  //   }
  // }
  // if (_rowIndex % 2 === 0) {
  //   if (columnIndex === 2) {
  //     return { rowspan: 1, colspan: 3 }
  //   } else if (columnIndex === 3 || columnIndex === 4) {
  //     return { rowspan: 0, colspan: 0 }
  //   }
  // }
}
let a = 0
const handleClick = (scope) => {
  console.log('111111', scope);
}

onMounted(() => {
  getList()
})
</script>
<template>
  <div class="about">
    <nx-tabs :data="tabs" @change="handleTabChange">
    </nx-tabs>
    <nx-filter @filterChange="filterChange" :btnList="funBtns" :screenData="screenData" v-model:page="page">
    </nx-filter>
    <div style="height: calc(100% - 200px)">
      <nx-table @searchEvent="searchEvent" ref="table" v-bind="tableData" @handleClick="handleClick" class="table"
        @scrollLoad="scrollLoad">
        <template #toolBarBtns>
          <el-button size="small" @click="() => { tableData.tr = [] }">功能1</el-button>
          <el-button size="small" @click="() => { tableData.tr = [] }">功能1</el-button>
          <el-button size="small" @click="() => { tableData.tr = [] }">功能1</el-button>
          <el-button size="small" @click="() => { tableData.tr = [] }">功能1</el-button>
        </template>
        <template #operate_slot="scope">
          <div>
            <el-button plain type="danger" size="mini" @click="handleClick(scope)">按钮</el-button>
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
