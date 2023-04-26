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
