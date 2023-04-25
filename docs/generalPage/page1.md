<style>
    .about {
      /* display: flex;
      flex-direction: column; */
      height: 100vh;
      width: 100%;
      padding: 8px;
      box-sizing: border-box;
    }
    .example{
        border: 1px solid #f5f5f5;
        border-radius: 5px;
        padding:20px
    }
    .el-button {
        margin:10px 5px
    }
    
    details > summary:first-of-type {
        font-size: 10px;
        padding: 8px 0;
        cursor: pointer;
        color: #1989fa;
    }
</style>

## 带有页签的页面

如何使用？

```javascript
// 导入vue的isReactive和isRef函数
import { isReactive, isRef } from 'vue'

// useFetch hook，用于封装异步请求的逻辑
function useFetch(fetchFunction) {
  // 定义一个异步函数，接收表格数据和参数作为参数
  async function fetchData(tableData, params) {
    let data // 定义一个变量用于存储请求结果
    tableData.loading = true // 设置表格数据的loading状态为true
    try {
      data = await fetchFunction(params) // 使用await等待请求函数返回结果，并赋值给data
    } catch (error) {
      console.log(error) // 如果请求出错，打印错误信息
    } finally {
      tableData.loading = false // 不管请求成功或失败，都将表格数据的loading状态设置为false
    }
    return data // 返回请求结果
  }
  return fetchData // 返回异步函数
}

// useData hook，用于判断数据是否是响应式或引用类型，并返回其值
function useData(data) {
  if (isRef(data)) {
    // 如果数据是引用类型
    return data.value // 返回其value属性
  } else if (isReactive(data)) {
    // 如果数据是响应式类型
    return data // 返回其本身
  }
}

// useTableData hook，用于处理表格数据的获取和更新逻辑
export function useTableData(table, tableData, interfaces, initialTab, params) {
  const hashMap = new Map() // 定义一个Map对象，用于存储不同接口对应的请求函数

  // 定义一个异步函数，用于获取列表数据，并接收一个标志位和一个处理函数作为参数
  const getListData = async (flag = false, fn = (res) => res) => {
    if (!hashMap.has(interfaces[useData(initialTab)])) {
      // 如果Map对象中没有当前选项卡对应的接口的请求函数
      const fetchData = useFetch(interfaces[useData(initialTab)]) // 调用useFetch hook，传入当前选项卡对应的接口，返回一个请求函数，并赋值给fetchData
      hashMap.set(interfaces[useData(initialTab)], fetchData) // 将当前选项卡对应的接口和请求函数存入Map对象中
    }
    if (flag) {
      // 如果标志位为true
      tableData.tr = [] // 清空表格数据的tr属性（表格行）
      params.current = 1 // 将参数对象的current属性（当前页码）设置为1
    }
    const fetchData = hashMap.get(interfaces[useData(initialTab)]) // 从Map对象中获取当前选项卡对应的接口的请求函数，并赋值给fetchData
    const data = await fetchData(tableData, params) // 调用fetchData函数，传入表格数据和参数对象，等待返回结果，并赋值给data
    if (!data) return // 如果没有返回结果，直接返回
    const { records = [], total = 0 } = fn(data) // 调用处理函数，传入返回结果，解构出records（记录数组）和total（总数），并设置默认值为空数组和0
    tableData.tr.push(...records) // 将记录数组展开并追加到表格数据的tr属性中
    tableData.total = total // 将总数赋值给表格数据的total属性
    table.value?.tableEmit('updateData') // 如果table存在且有value属性，则调用其tableEmit方法，传入'updateData'字符串，通知表格组件更新数据
  }

  // 定义一个异步函数，用于滚动加载更多数据
  const scrollLoad = async () => {
    if (tableData?.loading || tableData.total <= tableData.tr.length) return // 如果表格数据正在加载或者已经加载完毕，则直接返回
    params.current++ // 将参数对象的current属性加一，表示下一页的数据
    await getListData() // 调用getListData函数，获取下一页的数据
  }

  return { getListData, scrollLoad } // 返回两个异步函数，供外部调用
}
```

#### 组件与 vitepress 不兼容，因此用图片替代

![通用页面](/table.png)

<details>
<summary>展开查看</summary>

```vue
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import type { NxTableProps, IScreenData, ITableTh } from '@jinxb/nexus-ui'

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
      console.log('按钮1按钮1按钮1')
    }
  },
  {
    name: '按钮2',
    show: false,
    cb: () => () => {
      console.log('按钮2')
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
    refresh: true
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
    { field: 'age', title: '序号4' }
  ] as ITableTh[]
  tableData.th = th
  tableData.cacheKey = 'Nx-table' + tab
}
setTh(tabs[0].name)

const getList = async () => {
  tableData.loading = true
  const data = (await findList(10)) as []
  tableData.tr = [...tableData.tr, ...data]
  tableData.total = tableData.tr.length
  console.log(tableData.tr)

  tableData.loading = false
  table.value.tableEmit('updateData')
}

const scrollLoad = (params) => {
  console.log(params, '----------')
  if (tableData.loading) return
  getList()
}

function findList(size) {
  return new Promise((resolve) => {
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
  console.log(args, '----------------')
  let arr = table.value.tableEmit('getCheckboxRecords')
  console.log(arr, '------')
}

onMounted(() => {
  getList()
})
</script>
<template>
  <div class="about">
    <nx-tabs :data="tabs" @change="handleChange"> </nx-tabs>
    <nx-tab
      @filterChange="filterChange"
      :btnList="funBtns"
      :screenData="screenData"
      v-model:page="page"
    >
    </nx-tab>
    <div style="height: calc(100% - 210px)">
      <nx-table
        @scrollLoad="scrollLoad"
        ref="table"
        v-bind="tableData"
        @handleClick="handleClick"
        class="table"
      >
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
```

</details>
