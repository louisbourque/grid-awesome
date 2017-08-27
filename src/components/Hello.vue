<template>
  <div class="hello center">
    <grid-container>
      <grid-item v-for="item, index in areas"
                 :item="item"
                 :key="index"
                 @resize="resizeEvent"
                 @move="moveEvent"
                 @resized="resizedEvent"
                 @moved="movedEvent"
      >
      </grid-item>
    </grid-container>
  </div>
</template>

<script>
import GridContainer from './GridContainer'
import GridItem from './GridItem'
import { mapGetters } from 'vuex'

export default {
  name: 'hello',
  components: { GridContainer, GridItem },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'areas'
    ])
  },
  methods: {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
</style>
