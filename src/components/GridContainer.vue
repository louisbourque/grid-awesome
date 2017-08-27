<template>
    <div class="grid-container" :style="style">
        <slot></slot>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'grid-container',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      style: 'gridStyle'
    }),
    pinnedLayout() {
      return this.layout.filter(boxLayout => {
        return boxLayout.pinned
      })
    },
  },
}
</script>