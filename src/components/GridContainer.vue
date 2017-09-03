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

      box.$on('dragStart', ({item, offset, targetDimensions}) => {
        isDragging = true

        // find box
        this.dragging.item = item
        this.placeholder = utils.cloneItem(this.dragging.item)
        this.$set(item, 'dragging', true)
        this.placeholder.label = ''
        this.placeholder.id = 'placeholder'
        this.placeholder.w = this.columns[item.x] ? this.columns[item.x].size + this.columns[item.x].units : '3em'
        this.placeholder.h = this.columns[item.y] ? this.rows[item.y].size + this.rows[item.y].units : '3em'
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

