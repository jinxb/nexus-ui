<script lang='ts'>
export default {
  name: 'NxFilter'
}
</script>
<script setup lang='ts'>
import { reactive, watchEffect } from 'vue';
import type { IBtnListType, IScreenData } from './types';

const props = defineProps({
  btnList: {
    type: Array<IBtnListType>,
    default: () => []
  },
  screenData: {
    type: Array as () => IScreenData[],
    default: () => []
  },
  page: {
    type: Object,
    default: () => { }
  },
  showBorder: {
    type: Boolean,
    default: false
  },
  ignoredFields: {
    type: Array,
    default: () => ['current', 'size']
  }
})
const emit = defineEmits<{
  (e: string, value?: any): void
}>()
const data = reactive({
  page: {}
})

watchEffect(() => {
  data.page = props.page || {}
})

const onSelectChange = (value, key) => {
  emit(`update:page[${key}]`, value)
  emit('filterChange')
}

const handleClear = () => {
  for (const key in data.page) {
    if (!props.ignoredFields.includes(key)) {
      data.page[key] = ''
    }
  }
  emit('filterChange')
}

const handleQuery = () => {
  emit('filterChange')
}

</script>

<template>
  <div class="nx-filter" :class="{ 'set-border': showBorder }">
    <div class="btn-list">
      <template v-for="(item, index) in props.btnList" :key="index">
        <el-button v-show="item.show" :size="item.size || 'small'" :disabled="item.disabled"
          :type="item.type || 'primary'" v-bind="item.options" @click="item.cb()">{{ item.name }}</el-button>
      </template>
      <slot name="funBtn" />
    </div>
    <div class="form-search">
      <template v-for="(item, index) in props.screenData" :key="index">
        <div class="form-block">
          <div class="form-block-label" :style="{ width: (item.width || 130) + 'px' }">
            <span class="label" v-if="item.label">{{ item.label }}</span>
          </div>
          <el-select :style="{ width: (item.width || 240) + 'px !important;' }" v-bind="item" :clearable="item.clearable"
            @change="onSelectChange($event, item.key)" v-model="data.page[item.key]"
            :placeholder="item.placeholder || '请选择'" v-if="item.type === 'select'">
            <el-option v-for="itemB in item.options" :key="itemB.value" v-bind="itemB">
            </el-option>
          </el-select>
          <el-date-picker v-if="item.type === 'date'" v-model="data.page[item.key]" v-bind="item" type="daterange"
            :style="{ width: (item.width || 240) + 'px !important;' }" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期" value-format="YYYY-MM-DD" @change="onSelectChange($event, item.key)">
          </el-date-picker>
          <el-input :style="{ width: (item.width || 240) + 'px !important;' }" @change="onSelectChange($event, item.key)"
            clearable v-if="item.type === 'input'" v-model.trim="data.page[item.key]"
            :placeholder="item.placeholder || '请输入'" />
        </div>
      </template>
      <slot name="other" />
    </div>
    <div class="search-btn" :style="{ 'margin-left': `calc(${data.page['search_left_width'] || '130px'}` }">
      <div class="left">
        <slot name="search_left" />
        <el-button class="btn" type="primary" size="mini" plain @click="handleClear">清空</el-button>
        <el-button class="btn" type="primary" size="mini" @click="handleQuery">查询</el-button>
      </div>
      <div class="right">
        <slot name="search_right" />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
:deep(.el-input__inner),
:deep(.el-range-separator) {
  height: 28px;
}

:deep(.el-input--suffix),
:deep(.el-input__icon),
:deep(.el-range-separator) {
  line-height: 28px;
  font-size: 12px !important;
}

:deep(.el-range-input) {
  font-size: 12px !important;
}


.nx-filter {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: .8rem 0 .6rem .8rem;
  box-sizing: border-box;

  // .btn-list, .search-btn {
  //   margin-left: 2.4rem;
  // }
  .form-search {
    display: flex;
    flex-wrap: wrap;
    margin: .8rem 0;
    box-sizing: border-box;

    .form-block {
      display: flex;
      align-items: center;
      margin-bottom: .5rem;

      .form-block-label {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
        height: 100%;
      }
    }
  }

  .search-btn {
    display: flex;
    justify-content: space-between;

    .btn {
      width: 70px;
    }

    .right {
      margin-right: 64px;
    }
  }

  .label {
    margin: 0 8px 0 24px;
  }
}

.set-border {
  border-width: 0 1px;
  border-style: solid;
  border-color: #e4e7ed;
}
</style>
