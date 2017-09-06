// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
import * as utils from '../utils'

export const mutation = (state, value) => {
  state.val = value
}

export const setAreas = (state, value) => {
  state.areas = value
}

export const setDragAreas = (state, value) => {
  state.dragAreas = value
}

export const addDragArea = (state, value) => {
  state.dragAreas.push(value)
}

export const addArea = (state, value) => {
  let index = state.areas.length + 1
  while (state.areas.find(a => a.id === index)) {
    index++
  }
  while (state.areas.find(a => a.label === 'area' + index)) {
    index++
  }

  state.areas.push(
    utils.moveToFreePlace(
      state.areas,
      { x: 0, y: 0, w: 1, h: 1, label: 'area' + index, id: index },
      state.columns.length - 1,
      state.rows.length - 1
    )
  )
}

export const removeArea = (state, area) => {
  if (area) {
    let existingAreaIndex = state.areas.findIndex(a => a.id === area.id)
    console.log(existingAreaIndex)
    if (existingAreaIndex >= 0) {
      state.areas.splice(existingAreaIndex, 1)
    }
  } else {
    state.areas.pop()
  }
}

export const addRow = state => {
  state.rows.push(Object.assign({}, state.rows[state.rows.length - 1]))
}

export const removeRow = (state, row) => {
  if (row) {
    let existingRowIndex = state.rows.findIndex(r => r === row)
    if (existingRowIndex >= 0) {
      state.rows.splice(existingRowIndex, 1)
    }
  } else {
    state.rows.pop()
  }
}

export const addColumn = state => {
  state.columns.push(Object.assign({}, state.columns[state.columns.length - 1]))
}

export const removeColumn = (state, col) => {
  if (col) {
    let existingColIndex = state.columns.findIndex(c => c === col)
    if (existingColIndex >= 0) {
      state.columns.splice(existingColIndex, 1)
    }
  } else {
    state.columns.pop()
  }
}
