// getters are functions
import * as utils from '../utils'

export const areas = state => {
  return state.areas
}
export const dragAreas = state => {
  return state.dragAreas
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
        '    "' +
        state.columns
          .map((col, cIndex) => {
            let areas = state.dragAreas || state.areas
            let area = utils.areaAt(areas, { x: cIndex, y: rIndex, w: 1, h: 1 })
            return area ? area.label : '.'
          })
          .join(' ') +
        '"'
      )
    })
    .join('\n')
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
  if (item.id === 'placeholder') {
    return {
      backgroundColor: 'rgba(0,0,0,0.5)',
      position: 'absolute',
      top: 0,
      left: 0,
      height: item.h,
      width: item.w,
      transform: 'translate(' + item.x + 'px,' + item.y + 'px)',
    }
  }
  return {
    backgroundColor: utils.stringToRGBA(item.label),
    gridArea: item.label,
  }
}

export const css = state => {
  return `
@supports (grid-area: auto) {
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
    grid-temlate-areas:
${gridTemplateAreas(state)};
  }
    
${state.areas
    .sort((a, b) => a.label > b.label)
    .map(a => '  .' + a.label + ' {\n    grid-area: ' + a.label + ';\n  }')
    .join('\n')}
    
}`.replace(/ {4}\n/g, '')
}
