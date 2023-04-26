<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import type { NxTableProps, ITableTh, NxTableInstance }
  from '@jinxb/nexus-ui';
import { useTableData } from '@jinxb/nexus-ui';

import { tabs, page, screenData, funBtns } from './config';


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
    refresh: { query: (...status) => { getList(true); console.log(status) } }
  },
  // showPage: true,
  operateColumn: true,
  operateFixed: true,
  operateWidth: '120',
  total: 999,
  loading: false
})

const { getListData, scrollLoad } = useTableData(table, tableData, page, ({ size }) => findList(size), tabVal)

getList = (flag) => { getListData(flag) }

const setTh = (tab: string) => {
  const th = [
    { field: 'checkbox', width: 50, type: 'checkbox' },
    { field: 'id', title: '编号', handleClickShow: false },
    { field: 'name', title: '姓名', show: tab === tabVal.value },
    { field: 'role', title: '角色' },
    { field: 'age', title: '年龄' },
  ] as ITableTh[]
  tableData.th = th
  tableData.cacheKey = 'Nx-table' + tab
}
setTh(tabVal.value)


function findList(size) {
  return new Promise(resolve => {
    setTimeout(() => {
      var list = []
      for (var index = 0; index < size; index++) {
        list.push({
          id: 100000 + index,
          name: 'admin' + index,
          role: '前端开发',
          age: 10 + index,
        })
      }
      resolve({
        total: 200,
        records: list
      })
    }, 100)
  })
}

const handleClick = (scope) => {
  console.log('111111', scope);
}

onMounted(() => {
  getList()
})
</script>
<template>
  <div class="about">
    <nx-tabs :data="tabs" @change="handleTabChange">
    </nx-tabs>
    <nx-tab @filterChange="filterChange" :btnList="funBtns" :screenData="screenData" v-model:page="page">
    </nx-tab>
    <div style="height: calc(100% - 210px)">
      <nx-table @scrollLoad="scrollLoad" ref="table" v-bind="tableData" @handleClick="handleClick" class="table">
        <template #toolBarBtns>
          <el-button size="mini" @click="() => { }">功能1</el-button>
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
