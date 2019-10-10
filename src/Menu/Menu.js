import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import EventEmitter from 'eventemitter3'
import {ESCAPE, UP, DOWN, TAB} from '../constants/keys'
import {injectSheet} from '../theme'
import {getBoundingClientRect} from '../utils/DOM'
import {isolateMixin, beautyScroll} from '../utils/mixins'
import {MENU_ITEM_CONTEXT} from '../constants/context'

const emptyArr = []

export const MenuContext = React.createContext({})

@injectSheet(
  theme => ({
    menu: {
      extend: isolateMixin,
      fontFamily: theme.fontFamily,
      boxSizing: 'border-box',
      padding: 0,
      overflowY: 'auto',
      ...beautyScroll('&')
    }
  }),
  {name: 'Menu'}
)
export default class Menu extends PureComponent {
  static propTypes = {
    /**
     * Дополнительный CSS-класс поля
     */
    className: PropTypes.string,
    /**
     * Inline-стили поля
     */
    style: PropTypes.object,
    /**
     * Множественный выбор
     */
    multiple: PropTypes.bool,
    /**
     * Опции не активны
     */
    disabled: PropTypes.bool,
    /**
     * Автофокус первого/выбранного элемента
     */
    autoFocus: PropTypes.bool,
    /**
     * Максимальная высота компонента
     */
    maxHeight: PropTypes.number,
    /**
     * Выбранное значение, по-умолчанию считается, что это примитив. В случае множественного выбора - массив выбранных значений.
     */
    value: PropTypes.any,
    /**
     * Проверка равенства значений, задается, если
     * значением является объект. Ожидается, что возвращает `Boolean`
     */
    valuesEquality: PropTypes.func,
    /**
     * Опции поля
     */
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ]),
    /**
     * Коллбек, вызывающийся при изменении состояния
     */
    onChange: PropTypes.func,
    /**
     * Коллбек, вызывающийся при клике на `Escape`
     */
    onEscKeyDown: PropTypes.func,
    /**
     * Размер опций
     */
    size: PropTypes.oneOf(['small', 'medium'])
  }

  static defaultProps = {
    multiple: false,
    disabled: false,
    autoFocus: false,
    maxHeight: null,
    valuesEquality: (a, b) => a === b,
    onChange: () => {},
    onEscKeyDown: () => {},
    size: 'medium'
  }

  // static childContextTypes = {
  //   [MENU_ITEM_CONTEXT]: PropTypes.shape({
  //     /**
  //      * Проверка, выбрано ли значение (args: value)
  //      */
  //     isValueSelected: PropTypes.func,
  //     /**
  //      * Проверка, в фокусе ли значение (args: key)
  //      */
  //     isItemFocused: PropTypes.func,
  //     /**
  //      * Проверка, не активно ли меню
  //      */
  //     isMenuDisabled: PropTypes.func,
  //     /**
  //      * Получение размера меню
  //      */
  //     getMenuSize: PropTypes.func,
  //     /**
  //      * Получение MenuItem node ref (args: key)
  //      */
  //     getItemRef: PropTypes.func,
  //     /**
  //      * Шина событий
  //      * onPropsChange - изменение значений props в Menu, влияющих на отображение опций
  //      * onItemSelect - клик по MenuItem (args: value)
  //      * onItemFocus - фокус на MenuItem (args: id)
  //      * onItemMount - добавление и обновление MenuItem (args: id, componentInstanseRef)
  //      * onItemUnmount - удаление MenuItem (args: id)
  //      */
  //     events: PropTypes.instanceOf(EventEmitter)
  //   })
  // }

  constructor(props) {
    super(props)
    const {value} = props
    this.value = props.multiple
      ? Array.isArray(value)
        ? value
        : emptyArr
      : value
    this.state = {
      value: this.value
    }
    this.focusIndex = -1
    this.itemsKeys = []
    this.itemsRefs = {}
    this.registeredItems = {}
  }

  // getChildContext() {
  //   if (!this.events) this.createEvents()
  //
  //   return {
  //     [MENU_ITEM_CONTEXT]: {
  //       isValueSelected: this.isValueSelected,
  //       isItemFocused: this.isItemFocused,
  //       isMenuDisabled: this.isMenuDisabled,
  //       getMenuSize: this.getMenuSize,
  //       getItemRef: this.getItemRef,
  //       events: this.events
  //     }
  //   }
  // }

  get contextValue() {
    if (!this.events) this.createEvents()

    return {
      [MENU_ITEM_CONTEXT]: {
        isValueSelected: this.isValueSelected,
        isItemFocused: this.isItemFocused,
        isMenuDisabled: this.isMenuDisabled,
        getMenuSize: this.getMenuSize,
        getItemRef: this.getItemRef,
        events: this.events
      }
    }
  }

  updateItemsKeys() {
    const nodes = this.menu.querySelectorAll('[data-menu-item-id]')
    const refs = {}
    this.itemsKeys = Array.prototype.slice.call(nodes).map(node => {
      const key = node.getAttribute('data-menu-item-id')
      refs[key] = node
      return key
    })
    this.itemsRefs = refs
  }

  addItem = (key, ref) => {
    this.registeredItems[key] = ref
  }

  removeItem = key => {
    delete this.registeredItems[key]
  }

  createEvents() {
    this.events = new EventEmitter()
    this.events.on('onItemSelect', this.handleOptionSelect)
    this.events.on('onItemFocus', this.handleOptionFocus)
    this.events.on('onItemMount', this.addItem)
    this.events.on('onItemUnmount', this.removeItem)
  }

  componentDidMount() {
    this.updateItemsKeys()
    this.scrollToLastSelected()
    if (this.props.autoFocus) this.setAutoFocus()
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setValue(nextProps.value)
  // }

  getSnapshotBeforeUpdate() {
    this.setValue(this.props.value)
    return null
  }

  componentDidUpdate(prevProps, prevState) {
    const {props, state} = this
    this.updateItemsKeys()
    if (
      props.disabled !== prevProps.disabled ||
      props.size !== prevProps.size ||
      state.value !== prevState.value
    )
      this.events.emit('onPropsChange')

    if (this.props.autoFocus && !prevProps.autoFocus) this.setAutoFocus()
  }

  componentWillUnmount() {
    if (this.events) this.events.removeAllListeners()
  }

  isValueSelected = value => {
    const {props} = this
    if (props.multiple) {
      const selected = Array.isArray(this.value) ? this.value : emptyArr
      return selected.some(item => props.valuesEquality(item, value))
    } else {
      return props.valuesEquality(this.value, value)
    }
  }

  isItemFocused = key => {
    const index = this.itemsKeys.indexOf(key)
    return index > -1 ? index === this.focusIndex : false
  }

  isMenuDisabled = () => this.props.disabled

  getMenuSize = () => this.props.size

  getItemRef = key => this.itemsRefs[key]

  scrollToLastSelected() {
    const lastSelectedIndex = this.getLastSelectedIndex()
    if (lastSelectedIndex === -1) return
    const item = this.itemsRefs[this.itemsKeys[lastSelectedIndex]]
    if (!item) return
    const menuRect = getBoundingClientRect(this.menu)
    const itemRect = getBoundingClientRect(item)
    this.menu.scrollTop += itemRect.top - menuRect.top - menuRect.height / 2
  }

  setAutoFocus() {
    const lastSelectedIndex = this.getLastSelectedIndex()
    const newIndex = lastSelectedIndex > -1 ? lastSelectedIndex : 0
    this.setFocusByIndex(newIndex)
  }

  setValue(value) {
    if (this.props.multiple) {
      const currValue = Array.isArray(this.value) ? this.value : emptyArr
      const nextValue = Array.isArray(value) ? value : emptyArr
      if (
        nextValue.length === currValue.length &&
        nextValue.every((item, index) =>
          this.props.valuesEquality(item, currValue[index])
        )
      )
        return
    } else {
      if (this.props.valuesEquality(value, this.value)) return
    }
    this.value = value
    this.setState({value})
  }

  handleOptionFocus = key => {
    const index = this.itemsKeys.indexOf(key)
    if (index === -1) return
    this.setFocusByIndex(index)
  }

  getLastSelectedIndex() {
    return this.itemsKeys.reduceRight(
      (result, key, index) =>
        result === -1 && this.registeredItems[key].isSelected ? index : result,
      -1
    )
  }

  decrementFocusIndex() {
    const maxIndex = this.itemsKeys.length - 1
    this.setFocusByIndex(this.focusIndex <= 0 ? maxIndex : this.focusIndex - 1)
  }

  incrementFocusIndex() {
    const maxIndex = this.itemsKeys.length - 1
    this.setFocusByIndex(this.focusIndex >= maxIndex ? 0 : this.focusIndex + 1)
  }

  setFocusByIndex(focusIndex) {
    if (focusIndex === this.focusIndex) return
    this.focusIndex = focusIndex
    this.events.emit('onPropsChange')
  }

  handleOptionSelect = value => {
    const {props} = this
    let nextValue
    if (props.multiple) {
      const currValue = Array.isArray(this.value) ? this.value : emptyArr
      const withoutValue = currValue.filter(
        v => !props.valuesEquality(v, value)
      )
      nextValue =
        withoutValue.length === currValue.length
          ? currValue.concat(value)
          : withoutValue
    } else {
      nextValue = value
    }
    this.setValue(nextValue)
    props.onChange(nextValue)
  }

  keyDown = event => {
    const key = event.keyCode
    const shift = event.shiftKey

    if (key === ESCAPE) {
      this.props.onEscKeyDown(event)
    } else if (key === UP || (key === TAB && shift)) {
      event.preventDefault()
      this.decrementFocusIndex()
    } else if (key === DOWN || (key === TAB && !shift)) {
      event.preventDefault()
      this.incrementFocusIndex()
    }
  }

  handleBlur = () => {
    this.focusIndex = -1
  }

  saveMenuRef = ref => {
    this.menu = ref
  }

  getMenuProps() {
    /* eslint-disable no-unused-vars */
    const {
      autoFocus,
      value,
      theme,
      onChange,
      onEscKeyDown,
      multiple,
      valuesEquality,
      disabled,
      size,
      ...props
    } = this.props
    /* eslint-enable no-unused-vars */
    return props
  }

  render() {
    const {
      className,
      style,
      maxHeight,
      children,
      classes,
      ...other
    } = this.getMenuProps()

    // return (
    //   <div
    //     {...other}
    //     ref={this.saveMenuRef}
    //     style={{maxHeight, ...style}}
    //     className={classnames(classes.menu, className)}
    //     onKeyDown={this.keyDown}
    //     onBlur={this.handleBlur}>
    //     {children}
    //   </div>
    // )

    return (
      <MenuContext.Provider value={this.contextValue}>
        <div
          {...other}
          ref={this.saveMenuRef}
          style={{maxHeight, ...style}}
          className={classnames(classes.menu, className)}
          onKeyDown={this.keyDown}
          onBlur={this.handleBlur}>
          {children}
        </div>
      </MenuContext.Provider>
    )
  }
}
