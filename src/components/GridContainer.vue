<template>
    <div class="grid-container" ref="gridContainer" :style="gridStyle">
      <template v-if="this.dragAreas">
        <grid-item v-for="item, index in dragAreas"
                 :item="item"
                 :key="index"
        >
        </grid-item>
      </template>
      <template v-else>
          <grid-item v-for="item, index in areas"
                 :item="item"
                 :key="index"
                 @dragStart="dragStart"
                 @dragUpdate="dragUpdate"
                 @dragEnd="dragEnd"
                 @resizeStart="resizeStart"
                 @resizeUpdate="resizeUpdate"
                 @resizeEnd="resizeEnd"
        >
        </grid-item>
      </template>
        <grid-item v-if="dragging.item"
                 :item="placeholder"
                 :key="'placeholder'"
        >
        </grid-item>
    </div>
</template>
<script>
import * as utils from '../utils'
import GridItem from './GridItem'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'grid-container',
  components: { GridItem },
  data() {
    return {
      placeholder: {
        hidden: true,
        x: 0,
        y: 0,
        w: 1,
        h: 1,
        label: 'placeholder',
        id: 'placeholder',
      },
      dragging: {
        item: null,
        offset: {
          x: 0,
          y: 0,
        },
      },
      resizing: {
        item: null,
        offset: {
          x: 0,
          y: 0,
        },
      },
      initialLayout: undefined,
    }
  },
  computed: {
    ...mapGetters([
      'gridStyle',
      'areas',
      'gridSize',
      'rows',
      'columns',
      'dragAreas',
    ]),
  },
  methods: {
    ...mapActions([
      'addArea',
      'removeArea',
      'setAreas',
      'setDragAreas',
      'addDragArea',
    ]),
    dragStart: function({ item, offset, targetDimensions }) {
      this.dragging.item = item
      this.placeholder = utils.cloneItem(this.dragging.item)
      this.$set(item, 'dragging', true)
      this.placeholder.label = ''
      this.placeholder.id = 'placeholder'
      this.placeholder.w = targetDimensions.x + 'px'
      this.placeholder.h = targetDimensions.y + 'px'
      this.placeholder.xCorrection = targetDimensions.x / 2
      this.placeholder.yCorrection = targetDimensions.y / 2
      this.placeholder.x = offset.x - this.placeholder.xCorrection
      this.placeholder.y = offset.y - this.placeholder.yCorrection

      // clone layout
      this.initialLayout = utils.cloneLayout(this.areas)
    },
    dragUpdate: function(evt) {
      if (!this.dragging.item) {
        return
      }
      this.dragging.offset = evt.offset

      this.$set(
        this.placeholder,
        'x',
        evt.offset.x - this.placeholder.xCorrection
      )
      this.$set(
        this.placeholder,
        'y',
        evt.offset.y - this.placeholder.yCorrection
      )

      this.setDragAreas([])
      this.addDragArea(this.dragging.item)

      let draggingArea = document.querySelector('.dragging')

      if (
        this.dragging.offset.x >
        draggingArea.offsetLeft + draggingArea.offsetWidth
      ) {
        this.$set(this.dragging.item, 'x', this.dragging.item.x + 1)
      }

      if (this.dragging.offset.x < draggingArea.offsetLeft) {
        this.$set(this.dragging.item, 'x', this.dragging.item.x - 1)
      }

      if (this.dragging.item.x < 0) {
        this.dragging.item.x = 0
      }
      if (this.dragging.item.x >= this.columns.length) {
        this.dragging.item.x = this.columns.length - 1
      }

      if (
        this.dragging.offset.y >
        draggingArea.offsetTop + draggingArea.offsetHeight
      ) {
        this.$set(this.dragging.item, 'y', this.dragging.item.y + 1)
      }

      if (this.dragging.offset.y < draggingArea.offsetTop) {
        this.$set(this.dragging.item, 'y', this.dragging.item.y - 1)
      }

      if (this.dragging.item.y < 0) {
        this.dragging.item.y = 0
      }
      if (this.dragging.item.y >= this.rows.length) {
        this.dragging.item.y = this.rows.length - 1
      }

      this.initialLayout.forEach(item => {
        if (item.id === this.dragging.item.id) {
          return
        }
        this.addDragArea(
          utils.moveToFreePlace(
            this.dragAreas,
            item,
            this.columns.length - 1,
            this.rows.length - 1
          )
        )
      })
    },
    dragEnd: function(evt) {
      if (!this.dragging.item) {
        return
      }
      if (this.dragAreas) {
        this.setAreas(this.dragAreas)
      }

      this.$delete(this.dragging.item, 'dragging')
      this.dragging.item = null
      this.dragging.offset.x = 0
      this.dragging.offset.y = 0
      this.setDragAreas(null)
    },
    resizeStart: function({ item, offset }) {
      this.resizing.item = item
      this.$set(item, 'resizing', true)
      this.resizing.offsetStart = offset

      this.initialLayout = utils.cloneLayout(this.areas)
    },
    resizeUpdate: function(evt) {
      if (!this.resizing.item) {
        return
      }
      let previousOffset = this.resizing.offset || { x: 0, y: 0 }
      this.resizing.offset = evt.offset

      this.setDragAreas([])
      this.addDragArea(this.resizing.item)

      let changingArea = document.querySelector('.resizing')

      if (
        previousOffset.x < this.resizing.offset.x &&
        this.resizing.offset.x + this.resizing.offsetStart.x >
          changingArea.offsetLeft + changingArea.offsetWidth
      ) {
        this.$set(this.resizing.item, 'w', this.resizing.item.w + 1)
      }

      if (
        previousOffset.x > this.resizing.offset.x &&
        this.resizing.offset.x + this.resizing.offsetStart.x <
          changingArea.offsetLeft + changingArea.offsetWidth
      ) {
        this.$set(this.resizing.item, 'w', this.resizing.item.w - 1)
      }

      if (this.resizing.item.w < 1) {
        this.resizing.item.w = 1
      }
      if (this.resizing.item.w + this.resizing.item.x > this.columns.length) {
        this.resizing.item.w = this.columns.length - this.resizing.item.x
      }

      if (
        previousOffset.y < this.resizing.offset.y &&
        this.resizing.offset.y + this.resizing.offsetStart.y >
          changingArea.offsetTop + changingArea.offsetHeight
      ) {
        this.$set(this.resizing.item, 'h', this.resizing.item.h + 1)
      }

      if (
        previousOffset.y > this.resizing.offset.y &&
        this.resizing.offset.y + this.resizing.offsetStart.y <
          changingArea.offsetTop + changingArea.offsetHeight
      ) {
        this.$set(this.resizing.item, 'h', this.resizing.item.h - 1)
      }

      if (this.resizing.item.h < 1) {
        this.resizing.item.h = 1
      }
      if (this.resizing.item.h + this.resizing.item.y > this.rows.length) {
        this.resizing.item.h = this.rows.length - this.resizing.item.y
      }

      this.initialLayout.forEach(item => {
        if (item.id === this.resizing.item.id) {
          return
        }
        this.addDragArea(
          utils.moveToFreePlace(
            this.dragAreas,
            item,
            this.columns.length - 1,
            this.rows.length - 1
          )
        )
      })
    },
    resizeEnd: function(evt) {
      if (!this.resizing.item) {
        return
      }
      if (this.dragAreas) {
        this.setAreas(this.dragAreas)
      }
      this.$delete(this.resizing.item, 'resizing')
      this.resizing.item = null
      this.resizing.offset.x = 0
      this.resizing.offset.y = 0
      this.setDragAreas(null)
    },
  },
}
</script>
<style>
.grid-container {
  position: relative;
  transition: min-width ease-out 0.1s, min-height ease-out 0.1s;
  padding: 0.5rem;
  height: calc(100vh - 56px);
  box-sizing: border-box;
}

.grid-container .grid-area.placeholder {
    border: 1px dashed #000;
    background: none;
    z-index: 0;
    display: block;
    min-height: 1rem;
    min-width: 1rem;
}

.grid-container .grid-area.placeholder {
    transition: none !important;
}
</style>

