const reverseString = string => string.split('').reverse().join('')

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
