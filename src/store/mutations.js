// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
export const mutation = (state, value) => {
  state.val = value
}

export const addItem = (state, value) => {
  let index = state.areas.length + 1
  while (state.areas.find(a => a.label === 'area' + index)) {
    index++
  }
  let item = { x: 0, y: 0, w: 2, h: 2, label: 'area' + index }
  state.areas.push(item)
}
export const addRow = state => {
  state.rows.push({
    size: 10,
    units: 'em',
  })
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
  state.columns.push({
    size: 10,
    units: 'em',
  })
}

export const removeColumn = (state, col) => {
  if (col) {
    let existingColIndex = state.rowcolumnss.findIndex(c => c === col)
    if (existingColIndex >= 0) {
      state.columns.splice(existingColIndex, 1)
    }
  } else {
    state.columns.pop()
  }
}
