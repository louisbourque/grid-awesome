// getters are functions
import * as utils from '../utils'

export const areas = state => {
  return state.areas
}
export const rows = state => {
  return state.rows
}
export const columns = state => {
  return state.columns
}

export const gridStyle = state => {
  return {
    display: 'grid',
    gridTemplateRows: state.rows.reduce(
      (acc, val) => acc + val.size + val.units + ' ',
      ''
    ),
    gridTemplateColumns: state.columns.reduce(
      (acc, val) => acc + val.size + val.units + ' ',
      ''
    ),
  }
}

export const itemStyle = state => item => {
  return {
    backgroundColor: utils.stringToRGBA(item.label),
  }
}
