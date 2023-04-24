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

## 简单的使用

```vue
<template>
  <nx-table ref="xTable" v-bind="tableData"> </nx-table>
</template>
<script setup lang="ts">
interface ColumnData {
  field: string
  title: string
}

const spanMethod = ({ row, column, rowIndex, columnIndex }) => {
  if (row.name === '总计') {
    if (columnIndex === 0) {
      console.log(row)

      return { rowspan: 1, colspan: 2 }
    } else if (columnIndex === 1) {
      return { rowspan: 0, colspan: 0 }
    }
  }
}
const tableData = {
  height: 500,
  th: [
    { field: 'name', title: 'Name' },
    { field: 'age', title: 'Age' },
    { field: 'sum', title: 'Sum' }
  ] as ColumnData[],
  tr: [
    { name: 'a', age: 18, sum: 1 },
    { name: 'b', age: 18, sum: 2 },
    { name: 'c', age: 18, sum: 5 },
    { name: '总计', age: 18, sum: 8 },
    { name: 'd', age: 18, sum: 6 },
    { name: 'e', age: 18, sum: 7 },
    { name: 'f', age: 18, sum: 8 },
    { name: '总计', age: 18, sum: 21 },
    { name: 'g', age: 18, sum: 8 }
  ],
  attributes: {
    spanMethod: spanMethod
  }
}
</script>
<style>
.rowGreen {
  background-color: green;
}
</style>
```

![通用页面](/table.png)

<details>
<summary>展开查看</summary>
</details>

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
