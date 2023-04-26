## 带有页签的页面

#### 组件与 vitepress 不兼容，因此用图片替代

![通用页面](/table.png)

如何使用？

<details>
<summary>展开查看</summary>

### config.vue

```javascript
import { reactive } from 'vue'
import type { IScreenData } from '@jinxb/nexus-ui'

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

const page = reactive({
  current: 1,
  size: 50,
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

export { tabs, page, screenData, funBtns }

```

### pageHome.vue

```vue
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import type { NxTableProps, ITableTh, NxTableInstance } from '@jinxb/nexus-ui'
import { useTableData } from '@jinxb/nexus-ui'

import { tabs, page, screenData, funBtns } from './config'

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
  showSum: true,
  toolBar: {
    toolbarShow: true,
    print: true,
    zoom: true,
    import: true,
    export: true,
    refresh: {
      query: (...status) => {
        getList(true)
        console.log(status)
      }
    }
  },
  // showPage: true,
  operateColumn: true,
  operateFixed: true,
  operateWidth: '120',
  total: 999,
  loading: false
})

const { getListData, scrollLoad } = useTableData(
  table,
  tableData,
  page,
  ({ size }) => findList(size),
  tabVal
)

getList = (flag) => {
  getListData(flag)
}

const setTh = (tab: string) => {
  const th = [
    { field: 'checkbox', width: 50, type: 'checkbox' },
    { field: 'id', title: '序号', handleClickShow: false },
    { field: 'name', title: '序号2', show: tab === tabVal.value },
    { field: 'role', title: '序号3' },
    { field: 'age', title: '序号4' }
  ] as ITableTh[]
  tableData.th = th
  tableData.cacheKey = 'Nx-table' + tab
}
setTh(tabVal.value)

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
      resolve({
        total: 200,
        records: list
      })
    }, 250)
  })
}

const handleClick = (scope) => {
  console.log('111111', scope)
}

onMounted(() => {
  getList()
})
</script>
<template>
  <div class="about">
    <nx-tabs :data="tabs" @change="handleTabChange"> </nx-tabs>
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
          <el-button size="mini" @click="() => {}">功能1</el-button>
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
```

</details>
