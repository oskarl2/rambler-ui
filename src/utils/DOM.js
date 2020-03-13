let MutationObserver

/**
 * Полифилл для MutationObserver
 */
export function createMutationObserver(handler) {
  MutationObserver =
    MutationObserver ||
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver ||
    (callback => {
      let interval
      return {
        observe() {
          interval = setInterval(callback, 2e3)
        },
        disconnect() {
          clearInterval(interval)
        }
      }
    })

  return new MutationObserver(handler)
}

/**
 * Найти родителя, которого скроллим
 * @param  {HTMLElement} element - элемент, для которого ищет родительский элемент
 * @param  {Boolean} noCheckScrollHeight - проверять
 * @return {HTMLElement} найденный родительский элемент
 */
export function findScrollableParent(element, noCheckScrollHeight) {
  element = element.parentElement
  if (!element || element === document.body) return document.body
  if (
    noCheckScrollHeight ||
    element.scrollHeight > element.clientHeight ||
    element === document.body ||
    element === document.documentElement
  ) {
    const overflowY = getComputedStyle(element).overflowY
    if (overflowY === 'auto' || overflowY === 'scroll') return element
  }
  return findScrollableParent(element, noCheckScrollHeight)
}

/**
 * Найти родительский элемент, за пределы которого нельзя выходить элементу
 * @param  {HTMLElement} element - элемент, для которого ищет родительский элемент
 * @return {HTMLElement} найденный родительский элемент
 */
export function findOverflowedParent(element) {
  return findScrollableParent(element, true)
}

/**
 * Не все браузеры содержат width и height
 * Дополняем этими свойствами результат
 */
export function getBoundingClientRect(element) {
  const rect = element.getBoundingClientRect()
  if (rect.height === undefined) rect.height = rect.bottom - rect.top
  if (rect.width === undefined) rect.width = rect.left - rect.right
  return rect
}

/**
 * Доступен ли DOM. Используется для корректной работы с SSR
 */
export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)
