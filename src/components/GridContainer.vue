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
  components: {GridItem},
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
    }
  },
  computed: {
    ...mapGetters([
      'gridStyle',
      'areas',
      'gridSize',
      'rows',
      'columns',
      'dragAreas'
    ]),
  },
  methods: {
    ...mapActions([
      'addArea', 'removeArea', 'setAreas', 'setDragAreas', 'addDragArea'
    ]),
  },
  mounted() {
    this.$children.forEach(box => {
      var initialLayout
      var isDragging = false
      var isResizing = false

      box.$on('dragStart', ({item, offset, targetDimensions}) => {
        isDragging = true

        // find box
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
        initialLayout = utils.cloneLayout(this.areas)
      })

      box.$on('dragUpdate', evt => {
        if (!isDragging) {
          return
        }
        this.dragging.offset = evt.offset

        this.$set(this.placeholder, 'x', evt.offset.x - this.placeholder.xCorrection)
        this.$set(this.placeholder, 'y', evt.offset.y - this.placeholder.yCorrection)

        this.setDragAreas([])
        this.addDragArea(this.dragging.item)

        let draggingArea = document.querySelector('.dragging')

        console.log('(' + draggingArea.offsetLeft + ',' + draggingArea.offsetTop + ')')
        console.log('(' + this.dragging.offset.x + ',' + this.dragging.offset.y + ')')

        if (this.dragging.offset.x > draggingArea.offsetLeft + draggingArea.offsetWidth) {
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

        if (this.dragging.offset.y > draggingArea.offsetTop + draggingArea.offsetHeight) {
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

        initialLayout.forEach(item => {
          if (item.id === this.dragging.item.id) {
            return
          }
          this.addDragArea(
            utils.moveToFreePlace(this.dragAreas, item, this.columns.length - 1, this.rows.length - 1)
          )
        })
      })

      box.$on('dragEnd', evt => {
        if (!isDragging) {
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
        isDragging = false
      })

      box.$on('resizeStart', ({item, offset, targetDimensions}) => {
        isResizing = true

        this.resizing.item = item
        this.$set(item, 'resizing', true)
        this.resizing.offsetStart = offset

        initialLayout = utils.cloneLayout(this.areas)
      })

      box.$on('resizeUpdate', evt => {
        if (!isResizing) {
          return
        }
        let previousOffset = this.resizing.offset || { x: 0, y: 0 }
        this.resizing.offset = evt.offset

        this.setDragAreas([])
        this.addDragArea(this.resizing.item)

        let changingArea = document.querySelector('.resizing')
        console.log('ca.offsethw(' + changingArea.offsetHeight + ',' + changingArea.offsetWidth + ')')
        console.log('ca.offsettl(' + changingArea.offsetTop + ',' + changingArea.offsetLeft + ')')
        console.log('offset(' + this.resizing.offset.x + ',' + this.resizing.offset.y + ')')
        console.log('offsetStart(' + this.resizing.offsetStart.x + ',' + this.resizing.offsetStart.y + ')')

        if (previousOffset.x < this.resizing.offset.x && this.resizing.offset.x + this.resizing.offsetStart.x > changingArea.offsetLeft + changingArea.offsetWidth) {
          this.$set(this.resizing.item, 'w', this.resizing.item.w + 1)
        }

        if (previousOffset.x > this.resizing.offset.x && this.resizing.offset.x + this.resizing.offsetStart.x < changingArea.offsetLeft + changingArea.offsetWidth) {
          this.$set(this.resizing.item, 'w', this.resizing.item.w - 1)
        }

        if (this.resizing.item.w < 1) {
          this.resizing.item.w = 1
        }
        if (this.resizing.item.w >= this.resizing.item.x + this.columns.length) {
          this.resizing.item.w = this.columns.length - 1
        }

        if (previousOffset.y < this.resizing.offset.y && this.resizing.offset.y + this.resizing.offsetStart.y > changingArea.offsetTop + changingArea.offsetHeight) {
          this.$set(this.resizing.item, 'h', this.resizing.item.h + 1)
        }

        if (previousOffset.y > this.resizing.offset.y && this.resizing.offset.y + this.resizing.offsetStart.y < changingArea.offsetTop + changingArea.offsetHeight) {
          this.$set(this.resizing.item, 'h', this.resizing.item.h - 1)
        }

        if (this.resizing.item.h < 1) {
          this.resizing.item.h = 1
        }
        if (this.resizing.item.h >= this.rows.length) {
          this.resizing.item.h = this.rows.length - 1
        }

        initialLayout.forEach(item => {
          if (item.id === this.resizing.item.id) {
            return
          }
          this.addDragArea(
            utils.moveToFreePlace(this.dragAreas, item, this.columns.length - 1, this.rows.length - 1)
          )
        })
      })

      box.$on('resizeEnd', evt => {
        if (!isResizing) {
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
        isResizing = false
      })
    })
  },
}
</script>
<style>
.grid-container {
  position: relative;
  transition: min-width ease-out 0.1s, min-height ease-out 0.1s;
  margin: 0.5rem;
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

