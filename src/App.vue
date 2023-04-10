<script setup lang="ts">
import { RouterView } from 'vue-router'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'


</script>

<template>
  <el-config-provider :locale="zhCn">
  <RouterView />
</el-config-provider>
</template>

<style lang="scss" scoped>
@import './assets/style.scss';
#app {
  height: 100%;
  width: 100%;
}
</style>
