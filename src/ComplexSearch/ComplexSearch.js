import React, {PureComponent, cloneElement} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {withStyles} from '../theme'
import ClearIcon from './icons/ClearIcon'
import MediaSearchIcon from './icons/MediaSearchIcon'
import compose from '../utils/compose'
import {isolateMixin} from '../utils/mixins'
import SourceButtons from './SourceButtons'
import provideSearch from './provideSearch'
import provideSearchDropdown from './provideSearchDropdown'

const styles = theme => ({
  active: {},
  root: {
    extend: isolateMixin,
    fontFamily: theme.fontFamily,
    fontSize: theme.search.fontSize,
    width: '100%',
    maxWidth: theme.search.maxWidth,
    display: 'flex',
    flexDirection: 'column'
  },
  inputRow: {
    position: 'relative',
    width: '100%',
    display: 'flex'
  },
  inputWrapper: {
    borderColor: theme.search.input.default.borderColor,
    borderWidth: 2,
    borderStyle: 'solid',
    borderRightWidth: 0,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    borderRadius: '1px 0 0 1px',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: theme.search.input.backgroundColor,

    '&$active': {
      borderColor: theme.search.input.hover.borderColor
    }
  },
  division: {
    height: 30,
    padding: '0 12px',
    display: 'flex',
    alignItems: 'center',
    margin: '0 3px',
    fontSize: 11,
    textTransform: 'uppercase',
    fontWeight: 500,
    borderRadius: '1px',
    backgroundColor: theme.search.division.color,
    letterSpacing: 1.3,
    cursor: 'pointer'
  },
  input: {
    extend: isolateMixin,
    padding: '10px 12px',
    border: 'none',
    boxSizing: 'border-box',
    display: 'block',
    borderRadius: 0,
    height: '100%',
    width: '100%',
    fontWeight: 400,
    fontSize: theme.search.fontSize,
    lineHeight: '20px',
    appearance: 'none',
    color: theme.search.input.color,
    outline: 0,
    boxShadow: 'none',

    '&::-ms-reveal, &::-ms-clear': {
      display: 'none'
    },

    '&::-webkit-input-placeholder': {
      fontSize: theme.search.input.placeholder.fontSize,
      color: theme.search.input.placeholder.color,
      opacity: 1
    },
    '&::-moz-placeholder': {
      fontSize: theme.search.input.placeholder.fontSize,
      color: theme.search.input.placeholder.color,
      opacity: 1
    },
    '&:-ms-input-placeholder': {
      fontSize: theme.search.input.placeholder.fontSize,
      color: theme.search.input.placeholder.color,
      opacity: 1
    }
  },
  inputLeftIcon: {
    marginLeft: 12
  },
  searchButton: {
    extend: isolateMixin,
    width: 125,
    padding: '0 0 0 21px',
    color: theme.search.button.color,
    borderRadius: '0 1px 1px 0',
    border: 'none',
    flexShrink: 0,
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    boxSizing: 'border-box',
    background: theme.search.button.default.background,
    outline: 'none',
    fontSize: theme.search.button.fontSize,
    fontWeight: theme.search.button.fontWeight,
    letterSpacing: theme.search.button.letterSpacing,
    textTransform: theme.search.button.textTransform,

    '&:hover': {
      background: theme.search.button.hover.background
    },

    '&:active': {
      background: theme.search.button.active.background
    }
  },
  searchIcon: {
    marginRight: 7,
    verticalAlign: 'middle'
  },
  withoutButton: {
    '& $inputWrapper': {
      borderRadius: 1,
      borderRightWidth: 2,
      boxShadow: 'none'
    }
  },

  serviceIcons: {
    display: 'flex',
    flexShrink: 0,
    padding: '0 15px',
    alignItems: 'center'
  },

  serviceIcon: {
    opacity: 0.5,
    transition: 'opacity 0.2s, color 0.2s',
    color: theme.search.input.default.icon,
    cursor: 'pointer',
    marginRight: 10,

    '&:last-child': {
      marginRight: 0
    },

    '&:hover': {
      opacity: 1,
      color: theme.search.input.hover.icon
    },

    '&$active': {
      opacity: 1
    }
  },
  ...['small', 'medium'].reduce(
    (result, size) => ({
      ...result,
      [`size-${size}`]: {
        '& $inputWrapper': {
          height: theme.search.sizes[size].height
        }
      }
    }),
    {}
  )
})

class ComplexSearch extends PureComponent {
  static propTypes = {
    /**
     * Переопределение стандартных стилей компонента Search
     */
    style: PropTypes.object,
    /**
     * CSS-класс компонента
     */
    className: PropTypes.string,
    /**
     * CSS-класс для родителя инпута
     */
    inputWrapperClassName: PropTypes.string,
    /**
     * Текущий поисковый запрос
     */
    value: PropTypes.string,
    /**
     * Кнопка поиска
     */
    searchButton: PropTypes.node,
    /**
     * Объект для дополнительных стилей для кнопки
     */
    searchButtonStyle: PropTypes.object,
    /**
     * Дополнительный css-класс для кнопки поиска
     */
    searchButtonClassName: PropTypes.string,
    /**
     * Иконка поиска, по дефолту подставляется иконка с лупой
     */
    searchIcon: PropTypes.node,
    /**
     * Иконка инпута слева
     */
    inputLeftIcon: PropTypes.node,
    /**
     * Объект для дополнительных стилей для дропдауна
     */
    dropdownStyle: PropTypes.object,
    /**
     * Дополнительный css-класс для дропдауна
     */
    dropdownClassName: PropTypes.string,
    /**
     * Имя раздела, по которому ищем
     */
    division: PropTypes.string,
    /**
     * Плейсхолдер поискового инпута
     */
    placeholder: PropTypes.string,
    /**
     * Коллбек на изменение поискового запроса `function (value: string, options: object) {}`,
     * принимает первым аргументом значение поискового запроса
     */
    onSearch: PropTypes.func,
    /**
     * Коллбек на фокус поискового инпута
     */
    onFocus: PropTypes.func,
    /**
     * Коллбек на блур поискового инпута
     */
    onBlur: PropTypes.func,
    /**
     * Коллбек на выбор поискового запроса через стрелки, первым аргументом получает props.value соответствующего SuggestItem
     */
    onSelectItem: PropTypes.func,
    /**
     * Коллбек на клик SuggestItem, первым аргументом получает props.value соответствующего SuggestItem
     */
    onClickItem: PropTypes.func,
    /**
     * Коллбек на удаление SuggestItem, первым аргументом получает props.value соответствующего SuggestItem
     */
    onRemoveItem: PropTypes.func,
    /**
     * Колбек ховера по SuggestItem, первым аргументом получает props.value соответствующего SuggestItem
     */
    onHoverItem: PropTypes.func,
    /**
     * Коллбек на нажатие на кнопку поиска `function (value: string, options: object) {}`,
     * принимает первым аргументом значение поискового запроса
     */
    onSubmit: PropTypes.func,
    /**
     * Коллбек на нажатие на Enter `function (value: string, options: object) {}`,
     * принимает первым аргументом значение поискового запроса
     */
    onPressEnter: PropTypes.func,
    /**
     * Вставлять ли dropdown внутри body
     */
    appendToBody: PropTypes.bool,
    /**
     * Автоматическое позиционирование дропдауна по оси Y (если выходит за пределы экрана)
     */
    autoPositionY: PropTypes.bool,
    /**
     * Дополнительные аттрибуты для поискового инпута
     */
    inputProps: PropTypes.object,
    /**
     * Дополнительные аттрибуты для кнопок переключения источника поиска
     */
    sourceButtonsProps: PropTypes.func,
    /**
     * Текст тултипа поиска по сервису
     */
    serviceTooltipLabel: PropTypes.string,
    /**
     * Дополнительные аттрибуты для кнопки
     */
    searchButtonProps: PropTypes.object,
    /**
     * Для отображения поиска по сервису/интернету
     */
    sourceType: PropTypes.bool,
    /**
     * Размер поискового блока
     */
    size: PropTypes.oneOf(['small', 'medium'])
  }

  static defaultProps = {
    value: '',
    placeholder: '',
    size: 'medium',
    division: null,
    appendToBody: true,
    autoPositionY: false,
    searchButton: null,
    searchButtonStyle: {},
    searchButtonClassName: '',
    inputProps: {},
    searchButtonProps: {},
    sourceButtonsProps: () => ({}),
    sourceType: false,
    onSearch() {},
    onFocus() {},
    onBlur() {},
    onSelectItem() {},
    onClickItem() {},
    onRemoveItem() {},
    onHoverItem() {},
    onSubmit() {},
    onPressEnter() {}
  }

  /**
   * Показывать ли крестик очищения input
   * @return {Boolean}
   */
  get isClearVisible() {
    return Boolean(this.props.value)
  }

  renderInputIcon() {
    const {inputLeftIcon, theme, classes} = this.props
    if (!inputLeftIcon) return
    const {size, className, color} = inputLeftIcon.props
    return cloneElement(inputLeftIcon, {
      className: classnames(classes.inputLeftIcon, className),
      size: size || 15,
      color: color || theme.search.input.default.icon
    })
  }

  renderInputNode() {
    const {
      placeholder,
      inputProps,
      classes,
      setNode, // eslint-disable-line react/prop-types
      onKeyDown, // eslint-disable-line react/prop-types
      onFocus,
      onBlur,
      value,
      onSearch
    } = this.props

    return (
      <input
        type="text"
        onChange={onSearch}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        className={classes.input}
        placeholder={placeholder}
        {...inputProps}
        ref={setNode('input')}
      />
    )
  }

  renderInput = ref => {
    const {
      division,
      inputWrapperClassName,
      classes,
      isDropdownOpened, // eslint-disable-line react/prop-types
      onSubmit
    } = this.props

    return (
      <form
        action="#"
        method="get"
        className={classnames(
          classes.inputWrapper,
          inputWrapperClassName,
          isDropdownOpened && classes.active
        )}
        onSubmit={onSubmit}
        ref={ref}>
        {division && <div className={classes.division}>{division}</div>}
        {this.renderInputIcon()}
        {this.renderInputNode()}
        {this.renderServiceIcons()}
      </form>
    )
  }

  renderServiceIcons() {
    const {
      classes,
      sourceType,
      searchOptions, // eslint-disable-line react/prop-types
      sourceButtonsProps,
      serviceTooltipLabel,
      clearForm, // eslint-disable-line react/prop-types
      changeSourceType // eslint-disable-line react/prop-types
    } = this.props
    return (
      <div className={classes.serviceIcons}>
        {this.isClearVisible && (
          <ClearIcon
            className={classes.serviceIcon}
            size={20}
            color="currentColor"
            onClick={clearForm}
          />
        )}
        {sourceType && (
          <SourceButtons
            serviceTooltipLabel={serviceTooltipLabel}
            onSourceIconClick={changeSourceType}
            sourceButtonsProps={sourceButtonsProps}
            // eslint-disable-next-line react/prop-types
            activeType={searchOptions.sourceType}
          />
        )}
      </div>
    )
  }

  renderButton() {
    const {
      classes,
      searchButton,
      searchButtonStyle,
      searchButtonClassName,
      searchButtonProps,
      onSubmit
    } = this.props

    if (!searchButton) return null

    // если передали ноду - ее отдаем на рендер
    if (typeof searchButton === 'object') return searchButton

    return (
      <button
        type="button"
        className={classnames(classes.searchButton, searchButtonClassName)}
        onClick={onSubmit}
        size="small"
        style={searchButtonStyle}
        tabIndex={-1}
        {...searchButtonProps}>
        {this.renderSearchIcon()}
        {searchButton}
      </button>
    )
  }

  renderSearchIcon() {
    if (this.props.searchIcon === undefined)
      return (
        <MediaSearchIcon
          size={20}
          className={this.props.classes.searchIcon}
          color={this.props.theme.search.button.color}
        />
      )
    if (this.props.searchIcon) return this.props.searchIcon
    return null
  }

  renderDropdown() {
    // eslint-disable-next-line react/prop-types
    return this.props.renderDropdown(this.renderInput)
  }

  render() {
    const {
      classes,
      style,
      className,
      size,
      setNode // eslint-disable-line react/prop-types
    } = this.props
    const button = this.renderButton()

    return (
      <div
        className={classnames(
          classes.root,
          !button && classes.withoutButton,
          className,
          classes[`size-${size}`]
        )}
        style={style}
        ref={setNode('root')}>
        <div className={classes.inputRow}>
          {this.renderDropdown()}
          {button}
        </div>
      </div>
    )
  }
}

export default compose(
  provideSearch,
  provideSearchDropdown,
  withStyles(styles, {name: 'ComplexSearch'})
)(ComplexSearch)
