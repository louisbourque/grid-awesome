<template>
  <div :class="classes" :style="style">
    <input v-if="renaming" type="text" v-model="renamingLabel" v-on:blur="handleRename" v-on:keypress.enter="handleRename" class="input--rename" v-focusoninsert>
    <span class="text" ref="label">{{item.label}}</span>
    <span class="remove-button" @click="removeArea(item)">x</span>
    <div class="resize-handle" ref="resizeHandle"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'grid-item',
  props: ['item'],
  data() {
    return {
      renaming: false,
      renamingLabel: '',
    }
  },
  computed: {
    ...mapGetters(['areas']),
    style() {
      return this.$store.getters.itemStyle(this.item)
    },
    classes() {
      return {
        'grid-area': true,
        dragging: this.item.dragging,
        resizing: this.item.resizing,
      }
    },
    gridOrigin: function() {
      if (this.$parent.$refs && this.$parent.$refs.gridContainer) {
        return {
          x: this.$parent.$refs.gridContainer.offsetLeft,
          y: this.$parent.$refs.gridContainer.offsetTop,
        }
      }
      return { x: 0, y: 0 }
    },
  },
  directives: {
    focusoninsert: {
      inserted: function(el) {
        el.focus()
      },
    },
  },
  methods: {
    ...mapActions(['removeArea']),
    handleRename: function() {
      if (
        !this.renaming ||
        !this.renamingLabel ||
        this.areas.find(a => a.label === this.renamingLabel)
      ) {
        this.renamingLabel = ''
        this.renaming = false
        return
      }
      this.item.label = this.renamingLabel
      this.renamingLabel = ''
      this.renaming = false
    },
  },
  mounted() {
    this.$refs.label.addEventListener('mousedown', evt => {
      if (evt.button !== 0) {
        return
      }
      this.renaming = true
      this.renamingLabel = this.item.label
      evt.preventDefault()
      evt.stopPropagation()
    })
    this.$el.addEventListener('mousedown', evt => {
      if (
        evt.button !== 0 ||
        evt.target.localName === 'input' ||
        evt.target.localName === 'span'
      ) {
        return
      }
      evt.preventDefault()
      let offset = {
        x: evt.pageX - this.gridOrigin.x,
        y: evt.pageY - this.gridOrigin.y,
      }
      let targetDimensions = {
        x: evt.target.clientWidth,
        y: evt.target.clientHeight,
      }
      this.$emit('dragStart', { item: this.item, offset, targetDimensions })
      let mouseX = evt.clientX
      let mouseY = evt.clientY

      const handleMouseUp = evt => {
        window.removeEventListener('mouseup', handleMouseUp, true)
        window.removeEventListener('mousemove', handleMouseMove, true)

        var offset = {
          x: evt.clientX - mouseX,
          y: evt.clientY - mouseY,
        }
        this.$emit('dragEnd', { offset })
      }

      const handleMouseMove = evt => {
        let offset = {
          x: evt.pageX - this.gridOrigin.x,
          y: evt.pageY - this.gridOrigin.y,
        }
        this.$emit('dragUpdate', { offset })
      }

      window.addEventListener('mouseup', handleMouseUp, true)
      window.addEventListener('mousemove', handleMouseMove, true)
    })

    this.$resizeHandle = this.$refs.resizeHandle
    if (this.$resizeHandle) {
      this.$resizeHandle.addEventListener('mousedown', evt => {
        evt.preventDefault()
        evt.stopPropagation()
        let offset = {
          x: evt.pageX - this.gridOrigin.x,
          y: evt.pageY - this.gridOrigin.y,
        }
        this.$emit('resizeStart', { item: this.item, offset })
        let mouseX = evt.clientX
        let mouseY = evt.clientY

        const handleMouseUp = evt => {
          window.removeEventListener('mouseup', handleMouseUp, true)
          window.removeEventListener('mousemove', handleMouseMove, true)

          var offset = {
            x: evt.clientX - mouseX,
            y: evt.clientY - mouseY,
          }
          this.$emit('resizeEnd', { offset })
        }

        const handleMouseMove = evt => {
          var offset = {
            x: evt.clientX - mouseX,
            y: evt.clientY - mouseY,
          }
          this.$emit('resizeUpdate', { offset })
        }

        window.addEventListener('mouseup', handleMouseUp, true)
        window.addEventListener('mousemove', handleMouseMove, true)
      })
    }
  },
}
</script>


<style>
.grid-area {
    z-index: 1;
    box-sizing: border-box;
    position: relative;
}

.grid-area.dragging,
.grid-area.resizing {
    opacity: 0.7;
}

.grid-area:not(.dragging):not(.resizing) {
    transition: top ease-out 0.1s, left ease-out 0.1s, width ease-out 0.1s, height ease-out 0.1s;
}

.grid-area .resize-handle {
    position: absolute;
    right: -5px;
    bottom: -5px;
    width: 15px;
    height: 15px;
    cursor: se-resize;
}

.remove-button {
  position: absolute;
  right: 0;
  top: 0;
  width: 15px;
  height: 15px;
  font-weight: bold;
  color: #f33;
  cursor: pointer;
}

.input--rename{
  width: 100%;
  min-width: 5rem;
  box-sizing: border-box;
}
</style>