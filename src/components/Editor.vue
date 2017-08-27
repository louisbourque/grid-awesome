<template>
	<div class="editor">
    <div class="input">
      <p class="center">Grid Template Areas: {{areas.length}}</p>
      <button class="input__button input__button--add" @click="addArea">Add an area</button>
    </div>
    <div class="input">
      <p class="center">Grid Template Columns: {{columns.length}}</p>
      <div v-for="column, index in columns">
        Column {{index+1}} 
        <input v-model="column.size" class="input__input--size" type="number" name="size" size="5" :disabled="column.units === 'auto'">
        <select v-model="column.units">
          <option val="auto">auto</option>
          <option val="%">%</option>
          <option val="em">em</option>
          <option val="rem">rem</option>
          <option val="fr">fr</option>
          <option val="px">px</option>
          <option val="vw">vw</option>
        </select>
        <button class="input__button input__button--remove" v-if='columns.length > 1' @click="removeColumn(column)">X</button>
      </div>
      <button class="input__button input__button--add" @click="addColumn">Add Column</button>Remove Column</button>
    </div>
    <div class="input">
      <p class="center">Grid Template Rows: {{rows.length}}</p>
      <div v-for="row, index in rows">
        Row {{index+1}} 
        <input v-model="row.size" class="input__input--size" type="number" name="size" size="5" :disabled="row.units === 'auto'">
        <select v-model="row.units">
          <option val="auto">auto</option>
          <option val="%">%</option>
          <option val="em">em</option>
          <option val="rem">rem</option>
          <option val="fr">fr</option>
          <option val="px">px</option>
          <option val="vh">vh</option>
        </select>
        <button class="input__button input__button--remove" v-if='rows.length > 1' @click="removeRow(row)">X</button>
      </div>
      <button class="input__button input__button--add" @click="addRow">Add Row</button>
      
    </div>
    <div class="input">
      <p class="center">Grid Column Gap</p>
      <input v-model="colGap.size" class="input__input--size" type="number" name="size" size="5">
        <select v-model="colGap.units">
          <option val="%">%</option>
          <option val="em">em</option>
          <option val="rem">rem</option>
          <option val="px">px</option>
        </select>
    </div>
    <div class="input">
      <p class="center">Grid Row Gap</p>
      <input v-model="rowGap.size" class="input__input--size" type="number" name="size" size="5">
        <select v-model="rowGap.units">
          <option val="%">%</option>
          <option val="em">em</option>
          <option val="rem">rem</option>
          <option val="px">px</option>
        </select>
    </div>
    <div class="input">
      <p class="center">Justify Items</p>
        <select v-model="justify.value">
          <option val=""></option>
          <option val="stretch">stretch</option>
          <option val="center">center</option>
          <option val="start">start</option>
          <option val="end">end</option>
        </select>
    </div>
    <div class="input">
      <p class="center">Align Items</p>
        <select v-model="align.value">
          <option val=""></option>
          <option val="stretch">stretch</option>
          <option val="center">center</option>
          <option val="start">start</option>
          <option val="end">end</option>
        </select>
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
      'areas', 'rows', 'columns', 'css', 'colGap', 'rowGap', 'justify', 'align'
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
  margin-top:0.25rem;
}
.input__button--remove{
  background-color: #F15A7E;
  display: inline;
  padding: 0.25rem;
}
.input__input--size{
  width: 3rem;
}
.button--clipboard{
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
}
</style>