<template>
  <div :style="style">
    <span class="text">{{item.label}}</span>
  </div>
</template>

<script>

export default {
  name: 'grid-item',
  props: ['item'],
  data() {
    return {
    }
  },
  computed: {
    style() {
      return this.$store.getters.itemStyle(this.item)
    },
  },
}
</script>
