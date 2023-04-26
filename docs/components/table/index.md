### 图片实例

![通用页面](/table_cpn.png)

<details>
<summary class="show">展开查看</summary>

### pageName.vue

```vue
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import type { NxTableProps, ITableTh, NxTableInstance } from '@jinxb/nexus-ui'
import { useTableData } from '@jinxb/nexus-ui'

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
  operateColumn: true,
  operateFixed: true,
  operateWidth: '120',
  total: 999,
  loading: false
})
const page = reactive({
  current: 1,
  size: 50
})

const { getListData, scrollLoad } = useTableData(table, tableData, page, ({ size }) =>
  findList(size)
)

// 设置表头
const setTh = () => {
  const th = [
    { field: 'checkbox', width: 50, type: 'checkbox' },
    { field: 'id', title: '序号', handleClickShow: false },
    { field: 'name', title: '序号2' },
    { field: 'role', title: '序号3' },
    { field: 'age', title: '序号4' }
  ] as ITableTh[]
  tableData.th = th
  tableData.cacheKey = 'Nx-table'
}
setTh()

// 请求数据
getList = (flag) => {
  getListData(flag)
}

// 模拟请求数据
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

### Table Attributes

| Prop 名称           | 类型                                        | 描述                         | 默认值                                     |
| ------------------- | ------------------------------------------- | ---------------------------- | ------------------------------------------ |
| `th`                | `Array<ITableTh>`                           | 表格头部                     | `[]`                                       |
| `tr`                | `Array`                                     | 表格内容                     | `[]`                                       |
| `attributes`        | `Object`                                    | 组件的 HTML 属性             | `{}`                                       |
| `toolBar`           | `Object`                                    | 表格的工具栏设置             | `{ toolbarShow: false, borderShow: true }` |
| `events`            | `Object`                                    | 组件的事件列表               | `{}`                                       |
| `operateColumn`     | `Boolean`                                   | 是否启用表格操作列           | `false`                                    |
| `operateWidth`      | `String`                                    | 表格操作列的宽度             | `''`                                       |
| `operateFixed`      | `String\|Boolean`                           | 表格操作列的固定位置         | `false`                                    |
| `showSum`           | `Boolean`                                   | 是否显示表格汇总行           | `true`                                     |
| `total`             | `Number\|String`                            | 表格汇总行的数据             | `0`                                        |
| `loading`           | `Boolean`                                   | 是否显示加载中状态           | `false`                                    |
| `cacheKey`          | `String`                                    | 缓存表格状态的键名           | `''`                                       |
| `dropdownClass`     | `String`                                    | 表格下拉菜单的自定义样式类名 | `''`                                       |
| `scrollX`           | `Object`                                    | 表格的横向滚动配置           | `{ gt: -1 }`                               |
| `scrollY`           | `Object`                                    | 表格的纵向滚动配置           | `{ gt: -1 }`                               |
| `showOverflow`      | `VxeTablePropTypes.ShowOverflow\|undefined` | 表格单元格内容溢出显示方式   | `'tooltip'`                                |
| `heightControl`     | `Boolean`                                   | 是否允许表格高度自适应       | `true`                                     |
| `height`            | `String`                                    | 表格高度设置                 | `'auto'`                                   |
| `page`              | `Object`                                    | 表格分页配置                 | `{ pageSize: 30, pageNum: 0 }`             |
| `showPage`          | `Boolean`                                   | 是否显示表格分页             | `false`                                    |
| `highlightHoverRow` | `Boolean`                                   | 是否高亮显示鼠标悬停的行     | `true`                                     |
