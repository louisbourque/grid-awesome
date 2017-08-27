<template>
	<div>
      Rows: {{rows.length}}
    <button @click="addRow">Add Row</button>
    <button v-if='rows.length > 1' @click="removeRow()">Remove Row</button>
      Columns: {{columns.length}}
    <button @click="addColumn">Add Column</button>
    <button v-if='columns.length > 1' @click="removeColumn()">Remove Column</button>
    <button @click="addItem">Add an item</button>
   </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'editor',
  computed: {
    ...mapGetters([
      'rows', 'columns'
    ]),
  },
  methods: {
    ...mapActions([
      'addArea', 'addRow', 'removeRow', 'addColumn', 'removeColumn'
    ]),
  },
}
</script>
<style type="text/css">

</style>