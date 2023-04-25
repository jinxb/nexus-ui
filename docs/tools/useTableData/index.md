## useTableData
- `useTableData` hook 用于处理表格数据的获取和更新逻辑，接收以下参数：
  - `table`：一个表格组件实例
  - `tableData`：一个表格数据对象
  - `interfaces`：一个接口对象
  - `initialTab`：一个初始选项卡引用
  - `params`：一个参数对象
- `useTableData` hook 返回以下两个异步函数：
  - `getListData(flag = false, fn = (res) => res)`：用于获取列表数据，并根据不同的选项卡调用不同的接口，并可以传入以下参数：
    - `flag`：一个标志位，表示是否需要清空表格数据和重置页码，默认为 false
    - `fn`：一个处理函数，用于对请求结果进行自定义处理，默认为(res) => res
  - `scrollLoad()`：用于滚动加载更多数据，并根据当前页码和总数判断是否需要发送请求。

<details>
<summary>查看源码</summary>

```typescript
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
export function useTableData(
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

  const getListData = async (flag = false, fn = (res: any) => res) => {
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
      params.current = 1
    }
    const data = await fetchData(tableData, params)
    if (!data) return
    const { records = [], total = 0 } = fn(data)
    tableData.tr.push(...records)
    tableData.total = total
    table.value?.tableEmit('updateData')
  }

  const scrollLoad = async () => {
    if (tableData?.loading || tableData.total <= tableData.tr.length) return
    params.current++
    await getListData()
  }

  return {
    getListData,
    scrollLoad
  }
}
```

</details>