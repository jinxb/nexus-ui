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
    labelWidth: '100',
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
    labelWidth: '100',
    key: 'date'
  },
  {
    label: '仓库名称',
    labelWidth: '100',
    type: 'input',
    key: 'inputVal1'
  },
  {
    label: '仓库名称2',
    labelWidth: '100',
    type: 'input',
    key: 'inputVa22'
  },
  {
    label: '仓库名称3',
    labelWidth: '100',
    type: 'input',
    key: 'inputVa33'
  },
  {
    label: '仓库名称4',
    labelWidth: '100',
    type: 'input',
    key: 'inputVa44'
  }
]) as IScreenData[]

const funBtns = reactive([
  {
    name: '按钮1按钮1按钮1',
    show: false,
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
