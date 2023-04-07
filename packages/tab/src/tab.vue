<template>
  <div class="ls-tab">
    <div class="left">
      <el-input
        v-model.trim="data.searchText"
        placeholder="请输入搜索内容"
        class="input-with-select"
        style="width: 200px"

        :prefix-icon="Search"
        clearable
        @change="onSearchChange"
      />
      <template v-for="(item,index) in props.screenData" :key="index">
        <span class="label" v-if="item.label">{{item.label}}</span>
        <el-select  style="width:120px;" v-bind="item" :clearable="item.clearable" @change="onSelectChange($event,item.key)"  v-model="data.page[item.key]" :placeholder="item.placeholder||'请选择'" v-if="item.type==='select'">
          <el-option v-for="item in item.options" :key="item.value" v-bind="item">
          </el-option>
        </el-select>
        <el-date-picker

          v-if="item.type==='date'"
          v-model="data.page[item.key]"
          v-bind="item"
          type="daterange"
          style="width: 240px"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
          @change="onSelectChange($event,item.key)"
        >
        </el-date-picker>
        <template v-if="item.type==='selection'">
          <el-select
            v-model="data.page[item.key]"

            class="ls-tabSelection"
            style="margin-left:24px;"
            :style="{width:item.width}"
            placeholder="请选择"
            @change="onSelectChange($event,item.key)"
          >
            <el-option
              v-for="obj in item.selection"
              :key="obj.value"
              v-bind="obj"
            />
          </el-select>
          <el-date-picker
            v-model="data.page.date"

            style="width:240px;"
            type="daterange"
            align="left"
            :clearable="item.clearable===false?false:true"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
            :picker-options="item.pickerOptions"
            @change="onSelectChange($event,'date')"
          />
        </template>
        <el-input  style="width:120px;" @change="onSelectChange($event,item.key)" clearable v-if="item.type==='input'" v-model.trim="data.page[item.key]" :placeholder="item.placeholder||'请输入'" />
      </template>
      <slot name="left"/>
    </div>
    <div class="right">
      <slot name="right"/>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, reactive, watchEffect } from 'vue'
import { Search } from '@element-plus/icons-vue'
const props = defineProps({
  searchText: {
    type: String,
    default: ''
  },
  screenData: {
    type: Array,
    default: () => []
  },
  page: {
    type: Object,
    default: () => {}
  }
})
const data = reactive({
  searchText: '',
  page: { }
})
watchEffect(() => {
  data.searchText = props.searchText
  data.page = props.page || {}
})
const emit = defineEmits()
const onSearchChange = value => {
  emit('update:searchText', value)
  emit('filterChange')
}
const onSelectChange = (value, key) => {
  emit(`update:page[${key}]`, value)
  emit('filterChange')
}
</script>

<style lang="less">
.ls-tab {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  .left {
    flex: 1;
    display: flex;
    align-items: center;
    .label {
      margin: 0 8px 0 24px;
    }
    .ls-tabSelection{
      margin-right:8px;
      width:96px;
      :deep(.el-input__inner){
        padding-right: 15px;
      }
    }
  }
}
</style>
