<template>
  <div class="nx-tabs">
    <el-tabs v-model="activeName" :type="tabType" @tab-click="handleClick">
      <template v-for="(tab, index) in data">
        <el-tab-pane v-if="tab.visible !== false" :key="index" :disabled="tab.disabled" :label="tab.label"
          :name="tab.name">
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script lang='ts'>
export default {
  name: 'NxTabs'
}
</script>
<script setup lang='ts'>
import { ref } from 'vue';
import type { ITabType } from './types';

const emits = defineEmits(['change'])
const props = defineProps({
  data: {
    type: Array<ITabType>,
    default: () => [],
    required: true
  },
  initEmit: {
    type: Boolean,
    default: false
  },
  tabType: {
    type: String,
    default: ''
  }
})

let activeName = ref('')
if (props && props?.data.length) {
  activeName = ref(props?.data[0]?.name)
}
const handleClick = (...tab) => {
  emits('change', activeName.value, tab)
}
if (props.initEmit && activeName.value) {
  handleClick(props?.data[0])
}


</script>
<style lang="scss" scoped>
.nx-tabs {
  :deep(.el-tabs__header) {
    margin: 0;
  }

  :deep(.el-tabs__content) {
    padding: 0 !important;
  }

  :deep(.el-tabs__nav) {
    transform: translateX(16px) !important;
  }

}
</style>

