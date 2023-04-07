<template>
  <div class="nx-table-filter">
    <el-dropdown trigger="click" :hide-on-click="false" placement="bottom-end" @visible-change="visibleChange">
      <el-button size="mini" class="filter-button">
        <i class="el-icon-s-grid" />
        <i class="el-icon-caret-bottom" />
      </el-button>
      <template #dropdown>
        <el-dropdown-menu class="nx-dropdown">
          <div class="nx-dropdown-title">列表设置</div>
          <div v-if="heightControl" class="nx-dropdown-height">
            <span>行高设置</span>
            <div :class="{ active: heightStyle === 'medium' }" @click="emit('update:heightStyle', 'medium')">
              <i class="icon-easy" />宽松
            </div>
            <div :class="{ active: heightStyle === 'small' }" @click="emit('update:heightStyle', 'small')">
              <i class="icon-medium" />中等
            </div>
            <div :class="{ active: heightStyle === 'mini' }" @click="emit('update:heightStyle', 'mini')">
              <i class="icon-compact" />紧凑
            </div>
          </div>
          <div class="nx-dropdown-border">
            <span>边框颜色</span>
            <div>
              <span :style="{ 'background-color': borderColor }" />
              <el-color-picker :value="borderColor" show-alpha @change="colorChange" />
            </div>
          </div>
          <div class="nx-dropdown-items" :class="dropdownClass" v-if="show">
            <template v-for="item in tableTh">
              <template v-if="item.show !== false">
                <el-dropdown-item :key="item.title" :class="{ drags: !item.fixed }"
                  :style="{ display: item.title ? 'flex' : 'none' }" style="align-items: center">
                  <i class="el-icon-download fixed-left" :class="{ active: item.fixed === 'left' }"
                    @click="setFixed(item, 'left')" />
                  <i class="el-icon-download fixed-right" :class="{ active: item.fixed === 'right' }"
                    @click="setFixed(item, 'right')" />
                  <el-checkbox v-model="item.visible" style="width: 100%" class="checkbox-item"
                    @change="checkChange(item)">
                    {{ item.title }}
                  </el-checkbox>
                  <i v-if="!item.fixed" class="icon-drags" :class="{ drag: !item.fixed }"
                    style="color: #c0c4cc; margin-left: 10px; font-size: 18px; margin-right: 0" />
                </el-dropdown-item>
              </template>
            </template>
          </div>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import db from '../../db/db'
import Sortable from 'sortablejs'
import { watch, ref, nextTick, toRefs } from 'vue'
import { ITableTh } from './types';
const props = defineProps({
  th: {
    type: Array<ITableTh>,
    required: true
  },
  tableTh: {
    type: Array<ITableTh>,
    required: true
  },
  cacheKey: {
    type: String,
    default: ''
  },
  heightStyle: {
    type: String,
    default: 'medium'
  },
  dropdownClass: {
    type: String,
    default: ''
  },
  borderColor: {
    type: String,
    default: '#E6E8EA'
  },
  heightControl: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits<{
  (e:string, value?:any, params?: any):void
}>()
const show = ref(true)
watch(
  () => props.th.length,
  () => {
    cacheDropdownData()
  }
)
function colorChange (value) {
  emit('update:borderColor', value)
  db.set('nx_border-color', props.borderColor)
}
function setFixed (item, type) {
  emit('fixedChange', item, type)
}
function checkChange (item) {
  emit('checkChange', item)
}
function sort (evt) {
  const { oldIndex, newIndex } = evt
  emit('filterSort', oldIndex, newIndex)
  show.value = false
  nextTick(() => {
    show.value = true
    setTimeout(() => {
      visibleChange(true)
    }, 100)
  })
}
function visibleChange (flag) {
  if (flag) {
    const dom = document.querySelector(props.dropdownClass ? `.${props.dropdownClass}` : '.nx-dropdown-items')
    // eslint-disable-next-line no-undef
    Sortable.create(dom, {
      animation: 150,
      onEnd: sort,
      handle: '.drag',
      draggable: '.drags'
    })
  }
}
// 缓存配置
function cacheDropdownData () {
  if (!props.cacheKey) {
    return
  }
  const dropdownDataItem = props.th.map(data => {
    return { title: data.title, visible: data.visible, resizeWidth: data.resizeWidth, fixed: data.fixed || null }
  })
  db.set(props.cacheKey, dropdownDataItem)
}
// 初始化配置
const initDropdownData = async () => {
  if (!props.cacheKey) {
    return props.th
  }
  try {
    const dropdownDataStr = await db.get(props.cacheKey) as ITableTh[]
    props.th.forEach(value => {
      value.visible = value.visible !== undefined ? !!value.visible : true
      value.fixed = value.fixed || null
      if (value.children) {
        value.children.forEach(item => {
          item.fixed = null
        })
      }
    })
    if (dropdownDataStr) {
      const dropdownData = dropdownDataStr
      dropdownData.forEach((item, index) => {
        item.index = index
      })
      props.th.forEach(value => {
        const cacheDropdown = dropdownData.find(dropdown => dropdown.title === value.title)
        if (cacheDropdown) {
          value.visible = cacheDropdown.visible !== undefined ? cacheDropdown.visible : value.visible
          value.index = cacheDropdown.index
          value.fixed = cacheDropdown.fixed || null
          if (cacheDropdown.resizeWidth) {
            value.resizeWidth = cacheDropdown.resizeWidth
            value.width = cacheDropdown.resizeWidth
          }
        }
      })
      // eslint-disable-next-line vue/no-mutating-props
      props.th.sort((a, b) => a.index! - b.index!)
      return props.th
    }
    return props.th
  } catch (err) {
    console.log('组件初始化失败！')
    return props.th
  }
}
defineExpose({
  initDropdownData,
  cacheDropdownData
})
</script>

<style lang="scss">
@import '../css/style.scss';

.nx-table-filter {
  position: absolute;
  right: 0;
  top: -40px;
  z-index: 9;

  .filter-button {
    padding: 7px 9px;

    i {
      font-size: 16px;
      margin: 0 1px;
    }
  }
}
</style>
