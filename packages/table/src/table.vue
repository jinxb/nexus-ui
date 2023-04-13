<template>
  <div class="nx-table-x" :style="{ maxHeight: props.showSum ? 'calc(100% - 36px)' : '100%' }">
    <TableFilter
      v-if="props.th.length && data.showFilter && props.cacheKey"
      ref="filter"
      v-model:border-color="data.borderColor"
      v-model:height-style="data.heightStyle"
      :cache-key="props.cacheKey"
      :th="props.th"
      :height-control="props.heightControl"
      :table-th="data.tableTh"
      :dropdown-class="props.dropdownClass"
      @fixedChange="fixedChange"
      @checkChange="checkChange"
      @filterSort="filterSort"
    />
    <keep-alive>
      <InitColor
        v-model:border-color="data.borderColor"
        :cache-key="props.cacheKey"
        v-model:height-style="data.heightStyle"
      />
    </keep-alive>
    <vxe-table
      v-if="data.tableTh.length"
      ref="nxTable"
      border="none"
      :data="props.tr"
      resizable
      v-bind="props.attributes"
      auto-resize
      :height="props.height"
      :highlight-hover-row="props.highlightHoverRow"
      show-header
      show-header-overflow
      :show-overflow="props.showOverflow"
      :loading="false"
      :scroll-x="props.scrollX"
      :scroll-y="props.scrollY"
      :column-config="{ minWidth: 88 }"
      :class="{ 'height-medium': data.heightStyle === 'small' && props.heightControl, 'height-compact': data.heightStyle === 'mini' && props.heightControl }"
      :cell-style="{ 'border-right': '1px solid', 'border-bottom': '1px solid', 'border-color': data.borderColor }"
      :header-cell-style="{ 'border-right': '1px solid', 'border-bottom': '1px solid', 'border-color': data.borderColor }"
      :footer-cell-style="{ 'border-right': '1px solid', 'border-bottom': '1px solid', 'border-color': data.borderColor }"
      :style="{ 'border-color': data.borderColor }"
      v-on="props.events"
      @scroll="scrollEvent"
      @resizable-change="resizableChange"
    >
      <template v-for="head in data.tableTh">
        <vxe-table-colgroup
          v-if="head.children && head.show !== false && head.visible !== false"
          :key="head.title"
          v-bind="head"
        >
          <template>
            <vxe-table-column
              v-for="column in head.children"
              :key="column.title"
              :fixed="null"
              v-bind="column"
            >
              <template #default="scope">
                <slot
                  :name="column.field"
                  :scope="scope"
                  :params="column.params"
                >{{ scope.row[column.field] }}</slot>
              </template>
            </vxe-table-column>
          </template>
        </vxe-table-colgroup>
        <template v-else>
          <vxe-table-column
            v-if="head.show !== false && head.visible !== false"
            :key="head.title || 'selection'"
            v-bind="head"
          >
              <template v-if="head.type !== 'seq' && head.type !== 'checkbox'" #header="scope">
              <template v-if="head.type === 'date'">
                <el-popover placement="bottom-start" :width="260" popper-class="popper-filter" trigger="hover">
                  <el-date-picker
                    v-model="head.value"
                    type="daterange"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="YYYY-MM-DD"
                    style="width: 260px"
                    :picker-options="pickerOptions"
                    @change="emit('filter-confirm', head.field, head.value)"
                  />
                  <template #reference>
                    <div @click.stop>
                      {{ scope.column.title }}
                      <span v-if="!head.value" class="icon-filterh"><span class="path1"></span><span class="path2"></span></span>
                      <span v-else class="icon-filterhActive"><span class="path1"></span><span class="path2"></span></span>
                    </div>
                  </template>
                </el-popover>
              </template>
              <template v-else-if="head.type === 'filter'">
                <el-popover :width="260" placement="bottom-start" popper-class="popper-filter" trigger="hover">
                  <div class="btns">
                    <div
                      :class="{ 'disabled': head.options.length === head.template.length }"
                      @click="onClickReset(head)"
                    >重置</div>
                    <div
                      :class="{ 'disabled': head.template.length === 0 }"
                      @click="onClickFilter(head)"
                    >筛选</div>
                  </div>
                  <div class="options">
                    <el-scrollbar style="height: 100%">
                      <ul>
                        <el-checkbox
                          v-model="head.checkAll"
                          :indeterminate="head.template.length !== 0 && head.template.length !== head.options.length"
                          label="全部"
                          @change="onCheckAllChange($event, head)"
                        />
                      </ul>
                      <el-checkbox-group
                        v-model="head.template"
                        @change="head.checkAll = head.template.length === head.options.length"
                      >
                        <ul v-for="option in head.options" :key="option.key">
                          <el-checkbox :label="option.key">{{ option.label }}</el-checkbox>
                          <div class="only" @click="onClickOnly(head, option)">仅筛选此项</div>
                        </ul>
                      </el-checkbox-group>
                    </el-scrollbar>
                  </div>
                  <template #reference>
                    <div @click.stop>
                      {{ scope.column.title }}
                      <span v-if="head.value.length === 0" class="icon-filterh"><span class="path1"></span><span class="path2"></span></span>
                      <span v-else class="icon-filterhActive"><span class="path1"></span><span class="path2"></span></span>
                    </div>
                  </template>
                </el-popover>
              </template>
              <template v-else-if="head.type === 'search' || head.type === 'number'">
                <el-popover :width="260" popper-class="popper-filter" placement="bottom-start" trigger="hover">
                  <el-input
                    v-if="!head.selectList"
                    v-model="head.template"
                    placeholder="请输入搜索内容"
                    maxlength="30"
                    clearable
                    @change="onChangeSearch(head)"
                  />
                  <el-autocomplete
                    v-else
                    v-model="head.template"
                    placeholder="请输入搜索内容"
                    :fetch-suggestions="((queryString, cb) => {
                      querySearch(queryString, cb, head)
                    })"
                    clearable
                    :name="head.field"
                    :popper-append-to-body="false"
                    @change="onChangeSearch(head)"
                    @select="onChangeSearch(head)"
                    @clear="onChangeSearch(head)"
                  />
                  <template #reference >
                    <div @click.stop>
                      {{ scope.column.title }}
                      <span v-if="!head.value" class="icon-filterh"><span class="path1"></span><span class="path2"></span></span>
                      <span v-else class="icon-filterhActive"><span class="path1"></span><span class="path2"></span></span>
                    </div>
                  </template>
                </el-popover>
              </template>
              <template v-else>
                <slot
                  :name="head.field + '_header'"
                  :scope="scope"
                  :params="head.params"
                >{{ scope.column.title }}</slot>
              </template>
            </template>
            <template v-if="head.type !== 'seq' && head.type !== 'checkbox'" #default="scope">
              <slot
                :name="head.slots ? head.slots : head.field"
                :scope="scope"
                :params="head.params"
              >{{ scope.row[head.field] }}</slot>
            </template>
          </vxe-table-column>
        </template>
      </template>
      <vxe-table-column
        v-if="props.operateColumn"
        key="operate"
        title="操作"
        :fixed="props.operateFixed"
        :width="props.operateWidth ? props.operateWidth : '60'"
        align="center"
      >
        <template #default="scope">
          <div>
            <slot name="operate_slot" :scope="scope">
            </slot>
          </div>
        </template>
      </vxe-table-column>
      <template #empty>{{ props.loading ? '数据加载中' : '暂无数据' }}</template>
    </vxe-table>
    <div v-if="showSum" class="table-sum">已加载{{ props.tr.length }}条，共计{{ props.total }}条</div>
    <div
      v-show="props.loading"
      class="scroll-loading"
      :style="{ bottom: props.showSum ? '54px' : '18px' }"
    >
      <span>
        <i class="el-icon-loading" />正在加载中
      </span>
    </div>
    <el-pagination
      v-if="pageExist"
      :current-page="currentPage"
      :page-sizes="[30, 40, 50, 100]"
      :page-size="props.page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="props.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script lang="ts">
export default {
  name: 'NxTable'
}
</script>

<script setup lang="ts">
import TableFilter from './filter-x.vue'
import InitColor from './initColor.vue'
import db from '../../db/db'
import { reactive, computed, watch, nextTick, ref, onMounted, useAttrs, type PropType } from 'vue'

import type { VxeTableInstance, VxeTablePropTypes } from 'vxe-table';
import type { ITableTh } from './types';

const emit = defineEmits<{
  (e:string, value?:any, params?: any):void
}>()
const attrs = useAttrs()
const props = defineProps({
  th: {
    type: Array<ITableTh>,
    default: () => []
  },
  tr: {
    type: Array,
    default: () => []
  },
  attributes: {
    type: Object,
    default: () => {}
  },
  events: {
    type: Object,
    default: () => {}
  },
  operateColumn: {
    type: Boolean,
    default: false
  },
  operateWidth: {
    type: String,
    default: ''
  },
  operateFixed: {
    type: [String, Boolean],
    default: false
  },
  showSum: {
    type: Boolean,
    default: true
  },
  total: {
    type: [Number, String],
    default: 0
  },
  loading: {
    type: Boolean,
    default: false
  },
  cacheKey: {
    type: String,
    default: ''
  },
  dropdownClass: {
    type: String,
    default: ''
  },
  scrollX: {
    type: Object,
    default: () => {
      return { gt: -1 }
    }
  },
  scrollY: {
    type: Object,
    default: () => {
      return { gt: -1 }
    }
  },
  showOverflow: {
    type: (null as unknown) as PropType<
        VxeTablePropTypes.ShowOverflow | undefined
      >,
    default: 'tooltip'
  },
  heightControl: {
    type: Boolean,
    default: true
  },
  height: {
    type: String,
    default: 'auto'
  },
  page: {
    type: Object,
    pageSize: {
      type: Number,
      default: 30
    },
    pageNum: {
      type: Number,
      default: 0
    },
    default: null
  },
  showPage: {
    type: Boolean,
    default: false
  },
  highlightHoverRow: {
    type: Boolean,
    default: true
  }
})
const data = reactive({
  loadingObj: {},
  tableTh: [] as ITableTh[],
  showFilter: true,
  heightStyle: 'medium',
  borderColor: '#E6E8EA',
  cachePageSize: 30
})
const filter = ref<InstanceType<typeof TableFilter> | null>(null)
const pickerOptions = computed(() => {
  return {
    shortcuts: [{
      text: '今天',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 0)
        picker.emit('pick', [start, end])
      }
    }, {
      text: '最近一周',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        picker.emit('pick', [start, end])
      }
    }, {
      text: '最近一个月',
      onClick(picker) {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        picker.emit('pick', [start, end])
      }
    }]
  }
})
const currentPage = computed(() => props.page.pageNum + 1)
const pageExist = computed(() => props.page && props.page.pageNum >= 0 && props.page.pageSize && props.showPage)
watch(
  () => props.cacheKey,
  () => {
    data.showFilter = false
    data.tableTh = []
    setTimeout(() => {
      data.showFilter = true
      nextTick(async() => {
        data.tableTh = await filter.value!.initDropdownData()
      })
    }, 50)
  }
)
watch(
  () => props.th.length,
  () => {
    if (!props.cacheKey) data.tableTh = props.th
  }
)
const nxTable = ref<VxeTableInstance | null>(null)
watch(
  () => data.heightStyle,
  value => {
    if (nxTable.value) {
      nxTable.value.recalculate()
      nxTable.value.refreshScroll()
    }
    db.set('nx_height-style', data.heightStyle)
    emit('styleChange', value)
  }
)
watch(
  () => data.borderColor,
  value => {
    if (!value) data.borderColor = '#E6E8EA'
    db.set('nx_border-color', value)
  }
)
onMounted(async() => {
  data.tableTh = props.cacheKey ? await filter.value!.initDropdownData() : props.th
  data.tableTh.forEach(th => {
    switch (th.type) {
      case 'search':
      case 'number':
        th.template = ''
        break
      case 'filter':
        th.template = th.options.map(o => { return o.key })
        th.checkAll = true
        break
    }
  })
})
function handleCurrentChange(val) {
  const data = props.page
  data.pageNum = val - 1
  emit('update:page', data)
  emit('pageChange')
}
function handleSizeChange(val) {
  const data = props.page
  data.pageSize = val
  db.set('pageSize', val)
  emit('update:page', data)
  emit('pageChange')
}
function fixedChange(column, type) {
  data.tableTh.forEach(item => {
    if (item.title === column.title) {
      if (item.fixed === type) {
        item.fixed = null
      } else {
        item.fixed = type
      }
      data.tableTh = []
      nextTick(() => {
        data.tableTh = props.th
      })
    }
  })
  nxTable?.value?.recalculate(true)
  filter.value!.cacheDropdownData()
}
function resizableChange({ column }) {
  const prop = props.th.find(item => item.title === column.title)
  prop!.resizeWidth = column.resizeWidth
  filter.value!.cacheDropdownData()
}
function checkChange(item) {
  const check = data.tableTh.find(value => value.title === item.title)
  check!.visible = item.visible
  emit('headerChange', data.tableTh)
  filter.value!.cacheDropdownData()
}
function runCache() {
  filter.value!.cacheDropdownData()
}
function filterSort(oldIndex, newIndex) {
  const key = data.tableTh[oldIndex]
  data.tableTh.splice(oldIndex, 1)
  data.tableTh.splice(newIndex, 0, key)
  emit('update:th', data.tableTh)
  emit('headerChange', data.tableTh)
  filter.value!.cacheDropdownData()
}
function onCheckAllChange(value, head) {
  head.template = value ? head.options.map(o => { return o.key }) : []
}
function onClickReset(head) {
  if (head.template.length === head.options.length) {
    return
  }
  head.checkAll = true
  head.template = head.options.map(o => { return o.key })
  head.value = []
  emit('filter-confirm', head.field, [])
}
function onClickFilter(head) {
  if (head.template.length === 0) {
    return
  }
  head.value = head.template.length === head.options.length ? [] : head.template
  emit('filter-confirm', head.field, head.value)
}
function onClickOnly(head, option) {
  head.template = [option.key]
  head.value = head.template
  emit('filter-confirm', head.field, head.value)
}
function querySearch(queryString, cb, head) {
  let list = head.selectList
  list = head.selectList.filter(item => {
    return item.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
  })
  cb(list.map(item => { return { value: item } }))
}
function onChangeSearch(head) {
  let value = head.type === 'number' ? parseFloat(head.template) : head.template
  value = value || value === 0 ? value : ''
  if (head.type === 'number' && value && (head.precision || head.precision === 0)) {
    value = value.toFixed(head.precision)
  }
  head.template = value
  head.value = value
  emit('filter-confirm', head.field, head.value)
}
function scrollEvent({ scrollTop }) {
  if (attrs.onScrollLoad === undefined || props.loading) return
  const el = (nxTable.value!.$el).querySelector('.vxe-table--body-wrapper')
  const scrollHeight = +el.scrollHeight
  const clientHeight = +el.clientHeight
  if (scrollHeight === clientHeight) return
  if (scrollTop >= (scrollHeight - clientHeight - 50)) {
    emit('scrollLoad')
  }
}
function tableEmit(name, ...params) {
  return nxTable.value![name](...params)
}
defineExpose({
  tableEmit,
  runCache
})
</script>

<style lang="scss" scoped>
.nx-table-x {
  width: 100%;
  position: relative;
  flex: 1;
  height: 100%;
  :deep(.vxe-table) {
    border-width: 1px;
    border-style: solid;
    .vxe-checkbox--icon {
      left: 0.1em;
    }
    .vxe-table--header {
      border-bottom-width: 1px;
      border-style: solid;
      border-color: #e6e8ea;
      margin-bottom: -1px;
    }
    .vxe-table--header-wrapper {
      overflow-y: hidden;
    }
    .vxe-cell--title {
      color: #303133 !important;
      font-weight: 400;
      font-size: 16px;
    }
    td {
      padding: 0;
      height: 48px;
    }
    &.height-medium {
      td {
        height: 36px;
      }
    }
    &.height-compact {
      td {
        height: 28px;
      }
    }
    .row--hover {
      background: #d1e9ff;
    }
    .vxe-body--column.col--ellipsis > .vxe-cell {
      max-height: 999px;
    }
    .vxe-table--header-wrapper {
      background: #f6f7fa;
    }
    .vxe-table--fixed-left-wrapper {
      border-right: none;
    }
    .vxe-table--border-line {
      border: none !important;
    }
    .vxe-header--column .vxe-resizable.is--line:before {
      width: 0;
    }
    .vxe-cell--sort {
      width: 1em;
    }
  }
  .table-sum {
    line-height: 36px;
    display: flex;
    align-items: center;
    color: rgba(96, 98, 102, 100);
    font-size: 14px;
    text-align: left;
  }
  .scroll-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #ffffff;
    position: absolute;
    z-index: 999;
    padding: 8px 22px;
    border-radius: 18px;
    background: rgba(0, 0, 0, 0.6);
    left: 50%;
    transform: translateX(-50%);
    i {
      color: #ffffff;
      font-size: 16px;
      margin-right: 9px;
    }
  }
}

.popper-filter {
  padding: 24px 16px;
  .btns {
    display: flex;
    justify-content: flex-end;
    div {
      width: 58px;
      text-align: center;
      line-height: 26px;
      border-radius: 4px;
      margin-left: 8px;
      cursor: pointer;
    }
    div:first-child {
      border: 1px solid #dcdfe6;
      color: #909399;
    }
    div:last-child {
      border: 1px solid #1890ff;
      color: #1890ff;
    }
    .disabled {
      opacity: 0.4;
    }
  }
  .options {
    width: 260px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    margin-top: 8px;
    height: 260px;
    ul {
      display: flex;
      padding-left: 7px;
      align-items: center;
      line-height: 30px;
      justify-content: space-between;
      .el-checkbox {
        width: calc(100% - 10px);

        :deep(.el-checkbox__label) {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: calc(100% - 20px);
          vertical-align: sub;
          // line-height: 32px;
        }
      }

      .only {
        width: 86px;
        text-align: center;
        line-height: 30px;
        background-color: #1890ff;
        color: #fff;
        font-size: 14px;
        display: none;
        cursor: pointer;
        flex-shrink: 0;
      }
    }
    ul:hover {
      background-color: #f6f7fa;
      .only {
        display: block;
      }
      .el-checkbox {
        max-width: calc(100% - 90px);
      }
    }
  }
}
</style>
