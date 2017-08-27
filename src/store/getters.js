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
export const colGap = state => {
  return state.colGap
}
export const rowGap = state => {
  return state.rowGap
}
export const justify = state => {
  return state.justify
}
export const align = state => {
  return state.align
}

export const gridStyle = state => {
  return {
    display: 'grid',
    gridTemplateRows: state.rows.reduce(
      (acc, val) =>
        acc + (val.units === 'auto' ? '' : val.size) + val.units + ' ',
      ''
    ),
    gridTemplateColumns: state.columns.reduce(
      (acc, val) =>
        acc + (val.units === 'auto' ? '' : val.size) + val.units + ' ',
      ''
    ),
    gridColumnGap:
      state.colGap.size && state.colGap.units
        ? state.colGap.size + state.colGap.units
        : undefined,
    gridRowGap:
      state.rowGap.size && state.rowGap.units
        ? state.rowGap.size + state.rowGap.units
        : undefined,
    justifyItems: state.justify.value ? state.justify.value : undefined,
    alignItems: state.align.value ? state.align.value : undefined,
  }
}

export const itemStyle = state => item => {
  return {
    backgroundColor: utils.stringToRGBA(item.label),
  }
}

export const css = state => {
  return `
.grid-container{
  display: grid;
  grid-template-columns: ${state.columns.reduce(
    (acc, val) =>
      acc + (val.units === 'auto' ? '' : val.size) + val.units + ' ',
    ''
  )};
  grid-template-rows: ${state.rows.reduce(
    (acc, val) =>
      acc + (val.units === 'auto' ? '' : val.size) + val.units + ' ',
    ''
  )};
  ${state.colGap.size && state.colGap.units
    ? 'grid-column-gap: ' + state.colGap.size + state.colGap.units + ';'
    : ''}
  ${state.rowGap.size && state.rowGap.units
    ? 'grid-row-gap: ' + state.rowGap.size + state.rowGap.units + ';'
    : ''}
  ${state.justify.value ? 'justify-items: ' + state.justify.value + ';' : ''}
  ${state.align.value ? 'align-items: ' + state.align.value + ';' : ''}
}
  `.replace(/ {2}\n/g, '')
}
