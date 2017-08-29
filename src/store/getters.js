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

export const gridSize = state => {
  return { w: state.columns.length, h: state.rows.length }
}

export const gridTemplateAreas = state => {
  return state.rows
    .map((row, rIndex) => {
      return (
        '"' +
        state.columns
          .map((col, cIndex) => {
            let area = state.areas.find(a => a.x === rIndex && a.y === cIndex)
            return area ? area.label : 'empty'
          })
          .join(' ') +
        '"'
      )
    })
    .join(' ')
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
    gridTemplateAreas: gridTemplateAreas(state),
  }
}

export const itemStyle = state => item => {
  return {
    backgroundColor: utils.stringToRGBA(item.label),
    gridArea: item.label,
  }
}

export const css = state => {
  return `
.grid-container{
  display: grid;
  grid-template-columns: ${state.columns
    .reduce(
      (acc, val) =>
        acc + (val.units === 'auto' ? '' : val.size) + val.units + ' ',
      ''
    )
    .trim()};
  grid-template-rows: ${state.rows
    .reduce(
      (acc, val) =>
        acc + (val.units === 'auto' ? '' : val.size) + val.units + ' ',
      ''
    )
    .trim()};
  ${state.colGap.size && state.colGap.units
    ? 'grid-column-gap: ' + state.colGap.size + state.colGap.units + ';'
    : ''}
  ${state.rowGap.size && state.rowGap.units
    ? 'grid-row-gap: ' + state.rowGap.size + state.rowGap.units + ';'
    : ''}
  ${state.justify.value ? 'justify-items: ' + state.justify.value + ';' : ''}
  ${state.align.value ? 'align-items: ' + state.align.value + ';' : ''}
  grid-temlate-areas: ${gridTemplateAreas(state)};
}

${state.areas
    .map(a => '.' + a.label + '{\n  grid-area: ' + a.label + ';\n}')
    .join('\n')}
  
  `.replace(/ {2}\n/g, '')
}
