import { type Ref, isRef } from 'vue'
import type { NxTableInstance } from '../index'

// 定义一个接口，用于描述表格数据的类型
interface TableData {
  loading: boolean // 是否正在加载
  tr: any[] // 表格行数组
  total: number // 数据总数
  [key: string]: any
}

// 定义一个接口，用于描述参数对象的类型
interface Params {
  current: number // 当前页码
  [key: string]: any // 其他任意属性
}

// 定义一个类型，用于描述请求函数的类型
type FetchFunction = (params: Params) => Promise<any>

/**
 * 用于封装异步请求的逻辑，接收一个请求函数作为参数
 * @param fetchFunction
 * @returns 返回异步函数
 */
function useFetch(fetchFunction: FetchFunction) {
  async function fetchData(tableData: TableData, params: Params) {
    let data
    tableData.loading = true
    try {
      data = await fetchFunction(params)
    } catch (error) {
      console.log(error)
    } finally {
      tableData.loading = false
    }
    return data
  }
  return fetchData
}

/**
 * 用于判断数据是否是响应式，并返回其值
 * @param data
 * @returns 返回其ref的value属性或自身
 */
function useData(data: Ref<string>) {
  if (isRef(data)) {
    return data.value
  }
  return data
}

/**
 * 用于处理表格数据的获取和更新逻辑
 * @param table 表格组件实例
 * @param tableData 表格数据对象
 * @param interfaces 接口对象
 * @param initialTab 选项卡引用
 * @param params 参数对象
 * @returns 返回getListData和scrollLoad两个异步函数
 */
export default function useTableData(
  table: NxTableInstance,
  tableData: TableData,
  params: Params,
  interfaces: Record<string, FetchFunction> | FetchFunction,
  initialTab?: Ref<string>
) {
  const hashMap = new Map<string, ReturnType<typeof useFetch>>()
  let isMultipleOptions = false
  if (typeof interfaces === 'object' && initialTab) {
    isMultipleOptions = true
  }

  const getListData = async (flag = false, pagination = false, fn = (res: any) => res) => {
    let fetchData
    if (isMultipleOptions) {
      if (!hashMap.has(useData(initialTab!))) {
        const fetchApi = useFetch(interfaces![useData(initialTab!)])
        hashMap.set(useData(initialTab!), fetchApi)
      }
      fetchData = hashMap.get(useData(initialTab!))
    } else {
      fetchData = useFetch(interfaces as FetchFunction)
    }
    if (flag) {
      tableData.tr = []
      tableData.page.current = 1
    }
    const data = await fetchData(tableData, {
      ...params,
      current: tableData.page.current,
      size: tableData.page.size
    })
    if (!data) return
    const { records = [], total = 0 } = fn(data)
    if (!pagination) {
      tableData.tr.push(...records)
    } else {
      tableData.tr = records
    }
    tableData.total = total
    table.value?.tableEmit('updateData')
  }

  const scrollLoad = async () => {
    if (tableData?.loading || tableData.total <= tableData.tr.length) return
    tableData.page.current++
    await getListData()
  }

  const searchEvent = async (fn: () => any) => {
    tableData.tr = []
    await getListData(false, true)
    fn && fn()
  }

  return {
    getListData,
    scrollLoad,
    searchEvent
  }
}
