<template>
  <vxe-table-colgroup v-bind="head">
    <template v-for="th in head.children" :key="th.title">
      <Group v-if="th.children" :head="th" />
      <vxe-table-column v-else v-bind="th" :show-overflow="th.showOverflow===false?false:'tooltip'">
        <template #default="scope">
          <slot :name="th.field" :scope="scope" :params="th.params">
            {{ scope.row[th.field] }}
          </slot>
        </template>
      </vxe-table-column>
    </template>
  </vxe-table-colgroup>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Group',
  props: {
    head: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
