<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import type { NxTableProps, IScreenData, ITableTh } from '@jinxb/nexus-ui';

/**
 * tabs 页签部分
 * @tabs 配置项
 * @handleTabChange 页签切换触发的方法
 */
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
const handleTabChange = (name) => {
  setTh(name)
}



/**
 * 表单配置
 * @page 表单对应接收属性
 * @screenData 表单配置项
 * @funBtns 顶部按钮 - -定制化可有可无
 * @filterChange 表单change事件
 */
const page = reactive({
  select: '',
  inputVal1: '',
  inputVa22: '',
  inputVa33: '',
  inputVa44: ''
})
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
    label: '商品编码',
    type: 'date',
    key: 'date'
  },
  {
    label: '仓库名称',
    type: 'input',
    key: 'inputVal1'
  },
  {
    label: '仓库名称2',
    type: 'input',
    key: 'inputVa22'
  },
  {
    label: '仓库名称3',
    type: 'input',
    key: 'inputVa33'
  },
  {
    label: '仓库名称4',
    type: 'input',
    key: 'inputVa44'
  }
]) as IScreenData[]

const funBtns = reactive([
  {
    name: '按钮1按钮1按钮1',
    show: true,
    cb: () => () => {
      console.log('按钮1按钮1按钮1');
    }
  },
  {
    name: '按钮2',
    show: false,
    cb: () => () => {
      console.log('按钮2');
    }
  }
])

const filterChange = () => {
  console.log(page, '----------------------------------')
}


/**
 * 表格配置
 * @table 绑定表格ref
 * @tableData 表格配置项
 * @setTh 初始化表头数据
 * @getList 初始化表格行数据
 * @scrollLoad 下拉加载
 */
const table = ref(null)
// 表格配置
const tableData: NxTableProps = reactive({
  th: [] as ITableTh[],
  tr: [],
  showSum: true,
  toolBar: {
    toolbarShow: true,
    print: true,
    zoom: true,
    import: true,
    export: true,
    refresh: true,
  },
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

const setTh = (tab: string) => {
  let flag = tabs[0].name
  const th = [
    { field: 'checkbox', width: 50, type: 'checkbox' },
    { field: 'id', title: '序号', handleClickShow: false },
    { field: 'name', title: '序号2', show: tab === flag },
    { field: 'role', title: '序号3' },
    { field: 'age', title: '序号4' },
  ] as ITableTh[]
  tableData.th = th
  tableData.cacheKey = 'Nx-table' + tab
}
setTh(tabs[0].name)

const getList = async () => {
  tableData.loading = true
  const data = await findList(10) as []
  tableData.tr = [
    ...tableData.tr,
    ...data
  ]
  tableData.total = tableData.tr.length
  console.log(tableData.tr);

  tableData.loading = false
  table.value.tableEmit('updateData')
}

const scrollLoad = (params) => {
  console.log(params, '----------')
  if (tableData.loading) return
  getList()
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

const handleClick = (...args) => {
  console.log(args, '----------------');
  let arr = table.value.tableEmit('getCheckboxRecords')
  console.log(arr, '------');
}

onMounted(() => {
  getList()
})
</script>
<template>
  <div class="about">
    <nx-tabs :data="tabs" @change="handleTabChange">
    </nx-tabs>
    <nx-tab @filterChange="filterChange" :btnList="funBtns" :screenData="screenData" v-model:page="page">
    </nx-tab>
    <div style="height: calc(100% - 210px)">
      <nx-table @scrollLoad="scrollLoad" ref="table" v-bind="tableData" @handleClick="handleClick" class="table">
        <template #toolBarBtns>
          <el-button size="mini" @click="handleClick()">功能1</el-button>
          <el-button size="mini" @click="handleClick()">功能2</el-button>
          <el-button size="mini" @click="handleClick()">功能3</el-button>
          <el-button size="mini" @click="handleClick()">功能4</el-button>
        </template>
        <template #operate_slot="{ scope }">
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
