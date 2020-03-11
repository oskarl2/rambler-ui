/**
 * Returns a number whose value is limited to the given range.
 *
 * @param {number} value The value to be clamped
 * @param {number} min The lower boundary of the output range
 * @param {number} max The upper boundary of the output range
 * @returns {number} A number in the range [min, max]
 */
function clamp(value, min, max) {
  if (value < min) return min
  if (value > max) return max
  return value
}

/**
 * Converts a color from CSS hex format to CSS rgb format.
 *
 *  @param {string} color - Hex color, i.e. #nnn or #nnnnnn
 *  @returns {string} A CSS rgb color string
 */
function convertHexToRGB(color) {
  if (color.length === 4) {
    let extendedColor = '#'
    for (let i = 1; i < color.length; i++)
      extendedColor += color.charAt(i) + color.charAt(i)
    color = extendedColor
  }

  const values = {
    r: parseInt(color.substr(1, 2), 16),
    g: parseInt(color.substr(3, 2), 16),
    b: parseInt(color.substr(5, 2), 16)
  }

  return `rgb(${values.r}, ${values.g}, ${values.b})`
}

/**
 * Returns an object with the type and values of a color.
 *
 * Note: Does not support rgb % values and color names.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {{type: string, values: number[]}} A MUI color object
 */
function decomposeColor(color) {
  if (color.charAt(0) === '#') return decomposeColor(convertHexToRGB(color))

  color = color.replace(/\s/g, '')
  const marker = color.indexOf('(')
  if (marker === -1)
    throw new Error(`Rambler UI: The ${color} color was not parsed correctly,
      because it has an unsupported format (color name or RGB %). This may cause issues in component rendering.`)

  const type = color.substring(0, marker)
  let values = color.substring(marker + 1, color.length - 1).split(',')
  values = values.map(value => parseFloat(value))

  return {type, values}
}

/**
 * Converts a color object with type and values to a string.
 *
 * @param {object} color - Decomposed color
 * @param {string} color.type - One of, 'rgb', 'rgba', 'hsl', 'hsla'
 * @param {array} color.values - [n,n,n] or [n,n,n,n]
 * @returns {string} A CSS color string
 */
function convertColorToString(color) {
  const {type, values} = color

  // Only convert the first 3 values to int (i.e. not alpha)
  if (type.indexOf('rgb') > -1)
    for (let i = 0; i < 3; i++) values[i] = parseInt(values[i])

  let colorString

  if (type.indexOf('hsl') > -1)
    colorString = `${color.type}(${values[0]}, ${values[1]}%, ${values[2]}%`
  else colorString = `${color.type}(${values[0]}, ${values[1]}, ${values[2]}`

  if (values.length === 4) colorString += `, ${color.values[3].toFixed(2)})`
  else colorString += ')'

  return colorString
}

/**
 * Normalize color
 * @param  {String} color - Hex or rgba
 * @return {String} color in rgba mode
 */
export function normalize(color) {
  return convertColorToString(decomposeColor(color))
}

/**
 * Darkens a color.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function darken(color, coefficient) {
  color = decomposeColor(color)
  coefficient = clamp(coefficient, 0, 1)

  if (color.type.indexOf('hsl') > -1) color.values[2] *= 1 - coefficient
  else if (color.type.indexOf('rgb') > -1)
    for (let i = 0; i < 3; i++) color.values[i] *= 1 - coefficient

  return convertColorToString(color)
}

/**
 * Lightens a color.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function lighten(color, coefficient) {
  color = decomposeColor(color)
  coefficient = clamp(coefficient, 0, 1)

  if (color.type.indexOf('hsl') > -1)
    color.values[2] += (100 - color.values[2]) * coefficient
  else if (color.type.indexOf('rgb') > -1)
    for (let i = 0; i < 3; i++)
      color.values[i] += (255 - color.values[i]) * coefficient

  return convertColorToString(color)
}

/**
 * Set the absolute transparency of a color.
 * Any existing alpha values are overwritten.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} value - value to set the alpha channel to in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function fade(color, value) {
  color = decomposeColor(color)
  value = clamp(value, 0, 1)

  if (color.type === 'rgb' || color.type === 'hsl') color.type += 'a'
  color.values[3] = value

  return convertColorToString(color)
}

/**
 * @param  {string} color - Hex, rgb or rgba
 * @param  {string} mixinColor - Hex, rgb or rgba
 * @param  {number} coefficient - multiplier for mixinColor in the range 0 - 1
 * @return {string} color in rgba mode
 */
export function mix(color, mixinColor, coefficient = 1) {
  // ported from sass implementation in C
  // https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
  color = decomposeColor(color)
  mixinColor = decomposeColor(mixinColor)

  const colorAlpha = color.type === 'rgba' ? color.values[3] : 1
  const mixinColorAlpha = color.type === 'rgba' ? color.mixinColor[3] : 1

  const w = 2 * coefficient - 1
  const a = colorAlpha - mixinColorAlpha

  const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0
  const w2 = 1 - w1

  for (let i = 0; i < 3; i++)
    color.values[i] = w1 * color.values[i] + w2 * mixinColor.values[i]
  color[3] = colorAlpha * coefficient + mixinColorAlpha * (1 - coefficient)

  return convertColorToString(color)
}
