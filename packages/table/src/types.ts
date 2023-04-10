import type { VxeTablePropTypes } from 'vxe-table'

export interface ITableTh {
  field: string // 表头单元格绑定的字段名
  title: string // 表头单元格的标题
  type?: string // 表头单元格的类型，例如'selection'
  fixed?: string | null //  表头单元格是否固定在表格中，可以是'left'或'right'或null
  show?: boolean // 表头单元格是否显示
  visible?: boolean // 表头单元格是否可见 会影响拖拽顺序
  index?: number // 表头单元格的索引值
  width?: number // 表头单元格的宽度
  value?: any // 表头单元格的值
  slots?: string // 表头单元格的插槽名
  params?: any // 表头单元格的参数
  checkAll?: any // 是否是全选表头单元格
  resizeWidth?: number // 表头单元格是否可拖动调整宽度
  options?: any // 表头单元格的选项
  template?: any
  selectList?: any
  children?: [
    {
      title: string
      field: string
      fixed?: string | null
      params: any
    }
  ]
}

export interface IOperateData {
  key:
    | 'styleChange'
    | 'update:page'
    | 'pageChange'
    | 'headerChange'
    | 'update:th'
    | 'filter-confirm'
    | 'scrollLoad'

  title: string
  color?: string
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
  underline?: boolean
}

export type TShowOverflow = VxeTablePropTypes.ShowOverflow | undefined
