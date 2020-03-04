import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Tooltip from '../Tooltip'
import {injectSheet} from '../theme'
import GlobalSourceIcon from './icons/GlobalSourceIcon'
import ServiceSourceIcon from './icons/ServiceSourceIcon'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  active: {},
  icon: {
    opacity: 0.5,
    transition: 'opacity 0.2s, color 0.2s',
    color: theme.search.input.default.icon,
    cursor: 'pointer',
    marginRight: 10,
    height: 20,
    width: 20,
    display: 'inline-flex',

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
  }
})

class SourceButtons extends PureComponent {
  static propTypes = {
    /**
     * Переопределение стандартных стилей компонента SourceButtons
     */
    style: PropTypes.object,
    /**
     * CSS-класс компонента
     */
    className: PropTypes.string,
    /**
     * 	Дополнительные аттрибуты для кнопок переключения источника поиска
     */
    sourceButtonsProps: PropTypes.func,
    /**
     * 	Текст тултипа поиска по сервису
     */
    serviceTooltipLabel: PropTypes.string,
    /**
     * 	Коллбек клика по иконке
     */
    onSourceIconClick: PropTypes.func,
    /**
     * 	Тип активной иконки
     */
    activeType: PropTypes.string
  }

  static defaultProps = {
    className: '',
    sourceButtonsProps: () => ({}),
    serviceTooltipLabel: ''
  }

  render() {
    const {
      classes,
      sourceButtonsProps,
      serviceTooltipLabel,
      className,
      activeType,
      onSourceIconClick
    } = this.props
    return (
      <div className={classnames(classes.root, className)}>
        <Tooltip
          content="Искать в интернете"
          className={classnames(classes.icon, {
            [classes.active]: activeType === 'global'
          })}>
          <GlobalSourceIcon
            onClick={() => onSourceIconClick('global')}
            color="currentColor"
            {...sourceButtonsProps('global')}
            size={20}
          />
        </Tooltip>
        <Tooltip
          content={serviceTooltipLabel}
          className={classnames(classes.icon, {
            [classes.active]: activeType === 'service'
          })}>
          <div>
            <ServiceSourceIcon
              onClick={() => onSourceIconClick('service')}
              color="currentColor"
              size={20}
              {...sourceButtonsProps('service')}
            />
          </div>
        </Tooltip>
      </div>
    )
  }
}

export default injectSheet(styles, {name: 'SourceButtons'})(SourceButtons)
