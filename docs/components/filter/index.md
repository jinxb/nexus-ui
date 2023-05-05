# filter

---
## 使用方式

### Props
| Props | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| btnList | IBtnListType[] | [] | 按钮列表 |
| screenData | IScreenData[] | [] | 筛选项列表 |
| page | Object | {} | 当前页筛选条件 |
| showBorder | Boolean | false | 是否显示边框 |
| ignoredFields | Array | ['current', 'size'] | 忽略的字段数组 |

### IBtnListType 类型

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| name | String | - | 按钮文本 |
| type | String | 'primary' | 按钮类型，可选值为 'primary'、'success'、'warning'、'danger'、'info'、'text' |
| size | String | 'small' | 按钮大小，可选值为 'medium'、'small'、'mini' |
| options | Object | - | el-button 组件的其它属性配置 |
| show | Boolean | true | 是否显示该按钮 |
| disabled | Boolean | false | 是否禁用该按钮 |
| cb | Function | - | 点击按钮时执行的回调函数 |

### IScreenData 类型

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| key | String | - | 筛选项的 key 值，用于标识该筛选项 |
| label | String | - | 筛选项的标签文本 |
| type | String | - | 筛选项的类型，可选值为 'input'、'select'、'date' |
| width | Number | 130/240 | 筛选项的宽度 |
| options | Object | - | el-select、el-date-picker 组件的配置项，具体根据组件类型不同而不同。示例：{ options: [{ label: '选项1', value: '1' }, { label: '选项2', value: '2' }] } 表示 el-select 组件的选项为两个，分别是 '选项1' 和 '选项2'，对应的值为 '1' 和 '2'。示例：{ type: 'date', options: { type: 'daterange', startPlaceholder: '开始日期', endPlaceholder: '结束日期' } } 表示 el-date-picker 组件的类型为 'daterange'，同时传入了起始和结束日期的占位符文本。|


