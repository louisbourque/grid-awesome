export const areaAt = (layout, position) => {
  for (let i = 0; i < layout.length; i++) {
    if (
      layout[i].x < position.x + position.w &&
      layout[i].x + layout[i].w > position.x &&
      layout[i].y < position.y + position.h &&
      layout[i].y + layout[i].h > position.y
    ) {
      return layout[i]
    }
  }
  return false
}

export const moveToFreePlace = (layout, item, maxX, maxY) => {
  var newItem = cloneItem(item)
  let hasResetY = false

  while (areaAt(layout, newItem)) {
    newItem.y = newItem.y + 1
    if (newItem.y > maxY) {
      if (hasResetY) {
        newItem.y = 0
        newItem.x = 0
        return newItem
      }
      newItem.y = 0
      hasResetY = true
    }
    if (areaAt(layout, newItem)) {
      newItem.x = newItem.x + 1
      if (newItem.x > maxX) {
        newItem.x = 0
      }
    }
  }
  return newItem
}

export const cloneItem = item => {
  return Object.assign({}, item)
}

export const cloneLayout = layout => {
  return layout.map(item => {
    return cloneItem(item)
  })
}

const reverseString = string =>
  string
    .split('')
    .reverse()
    .join('')

export const stringToRGBA = string => {
  let hex = ('000000' +
    (parseInt(reverseString(string), 36) & 0xffffff)
      .toString(16)
      .toUpperCase()).slice(-6)
  return (
    'rgba(' +
    parseInt(hex.slice(0, 2), 16) +
    ',' +
    parseInt(hex.slice(2, 4), 16) +
    ',' +
    parseInt(hex.slice(4, 6), 16) +
    ',0.5)'
  )
}

/*!
 * function copyTextToClipboard(text) from  https://stackoverflow.com/a/30810322
 */
export const copyTextToClipboard = text => {
  var textArea = document.createElement('textarea')

  //
  // *** This styling is an extra step which is likely not required. ***
  //
  // Why is it here? To ensure:
  // 1. the element is able to have focus and selection.
  // 2. if element was to flash render it has minimal visual impact.
  // 3. less flakyness with selection and copying which **might** occur if
  //    the textarea element is not visible.
  //
  // The likelihood is the element won't even render, not even a flash,
  // so some of these are just precautions. However in IE the element
  // is visible whilst the popup box asking the user for permission for
  // the web page to copy to the clipboard.
  //

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed'
  textArea.style.top = 0
  textArea.style.left = 0

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em'
  textArea.style.height = '2em'

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0

  // Clean up any borders.
  textArea.style.border = 'none'
  textArea.style.outline = 'none'
  textArea.style.boxShadow = 'none'

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent'

  textArea.value = text

  document.body.appendChild(textArea)

  textArea.select()

  try {
    document.execCommand('copy')
  } catch (err) {}

  document.body.removeChild(textArea)
}
