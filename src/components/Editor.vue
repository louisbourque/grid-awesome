<template>
	<div class="editor">
    <div class="input">
      <p>Grid Template Areas: {{areas.length}}</p>
      <button class="input__button input__button--add" @click="addArea">Add an area</button>
    </div>
    <div class="input">
      <p>Grid Template Rows: {{rows.length}}</p>
      <button class="input__button input__button--add" @click="addRow">Add Row</button>
      <button class="input__button input__button--remove" v-if='rows.length > 1' @click="removeRow()">Remove Row</button>
    </div>
    <div class="input">
      <p>Grid Template Columns: {{columns.length}}</p>
      <button class="input__button input__button--add" @click="addColumn">Add Column</button>
      <button class="input__button input__button--remove" v-if='columns.length > 1' @click="removeColumn()">Remove Column</button>
    </div>

    <div class="css-output">
    <button class="input__button button--clipboard" @click="copyTextToClipboard(css)">Copy to Clipboard</button>
      CSS: 
      {{css}}
    </div>
   </div>
</template>

<script>
import {copyTextToClipboard} from '../utils'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'editor',
  computed: {
    ...mapGetters([
      'areas', 'rows', 'columns', 'css'
    ]),
  },
  methods: {
    ...mapActions([
      'addArea', 'addRow', 'removeRow', 'addColumn', 'removeColumn'
    ]),
    copyTextToClipboard: function(text) {
      copyTextToClipboard(text)
    }
  },
}
</script>
<style type="text/css">
.css-output{
   white-space: pre-wrap;
   position: relative;
}
.input{
  border-bottom: 1px solid #000;
  padding:0.5rem;
}
.input__button{
  display: block;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 0;
  border-radius: 0.2rem;
  box-shadow: 0 0.1rem 0.1rem 0 rgba(0,0,0,0.5);
  color: #000;
  font-weight: bold;
  cursor: pointer;
}
.input__button--add{
  background-color: lightgreen;

}
.input__button--remove{
  background-color: #F15A7E;
}
.button--clipboard{
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
}
</style>