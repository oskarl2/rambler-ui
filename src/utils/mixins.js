export const middleMixin = {
  '&:before': {
    display: 'inline-block',
    height: '100%',
    verticalAlign: 'middle',
    content: '""',
    width: 0
  },
  '& > *': {
    verticalAlign: 'middle'
  }
}

export const isolateMixin = {
  borderCollapse: 'separate',
  borderSpacing: 0,
  borderRadius: 0,
  captionSide: 'top',
  cursor: 'auto',
  direction: 'ltr',
  emptyCells: 'show',
  fontFamily: 'inherit',
  fontSize: 'medium',
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 'normal',
  fontStretch: 'normal',
  lineHeight: 'normal',
  verticalAlign: 'baseline',
  hyphens: 'none',
  letterSpacing: 'normal',
  listStyle: 'disc outside none',
  tabSize: '8',
  textAlign: 'left',
  textAlignLast: 'auto',
  textIndent: '0',
  textShadow: 'none',
  textTransform: 'none',
  visibility: 'visible',
  whiteSpace: 'normal',
  widows: '2',
  wordSpacing: 'normal',
  padding: 0,
  margin: 0
}

const responsiveFactory = rule => options => ({[rule]: options})

export const ifDesktop = responsiveFactory('@media (min-device-width: 768px)')

export const ifMobile = responsiveFactory('@media (max-device-width: 767px)')

export const ifDesktopWindow = responsiveFactory('@media (min-width: 768px)')

const pseudoSelectors = [
  '::-webkit-input-placeholder',
  '::-moz-placeholder',
  ':-moz-placeholder',
  ':-ms-input-placeholder',
  '::placeholder'
]

export const placeholderMixin = (selector, style) =>
  pseudoSelectors.reduce(
    (result, pseudo) => ({
      ...result,
      [`${selector}${pseudo}`]: style
    }),
    {}
  )

export const fontSmoothingMixin = {
  '-webkit-font-smoothing': 'antialiased',
  '-moz-osx-font-smoothing': 'grayscale'
}

/**
 * Applying styles on elements depending on focus event source type
 * @param {string} sourceType Other/pointer
 * @param {string} selector CSS-selector
 * @param {string} declaration CSS-declaration
 */
export const focusSourceMixin = (
  sourceType = 'other',
  selector,
  declaration
) => ({
  [`html[data-focus-source="${sourceType}"] ${selector}`]: declaration
})
