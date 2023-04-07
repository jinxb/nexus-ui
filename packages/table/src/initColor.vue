<template>
  <div style="display:none;" />
</template>

<script>
import db from '../../db/db'
export default {
  name: 'InitColor',
  props: {
    borderColor: {
      type: String,
      default: '#E6E8EA'
    },
    heightStyle: {
      type: String,
      default: '#E6E8EA'
    },
    cacheKey: {
      type: String,
      default: ''
    }
  },
  async activated() {
    const borderColor = await db.get('nx_border-color')
    const heightStyle = await db.get('nx_height-style')
    if (borderColor) { this.$emit('update:borderColor', borderColor) }
    if (heightStyle) { this.$emit('update:heightStyle', heightStyle) }
  }
}
</script>
