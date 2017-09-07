<template>
  <div class="hello content">
    <editor></editor>
    <grid-container></grid-container>
  </div>
</template>

<script>
import Editor from '@/components/Editor'
import GridContainer from './GridContainer'
import GridItem from './GridItem'

export default {
  name: 'hello',
  components: { Editor, GridContainer, GridItem },
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
