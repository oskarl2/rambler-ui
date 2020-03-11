import React from 'react'
import Popup from './Popup'
import Button from '../Button/Button'
import {POPUP_ZINDEX} from '../constants/z-indexes'
import {withTheme, mount, getNodeStyles} from '../../test/utils'
import theme from '../theme/base'
import {normalize as nc} from '../utils/colors'

describe('<Popup />', () => {
  let containerNode

  const mountWrapper = props =>
    mount(
      withTheme(
        <Popup
          className="popup"
          containerRef={ref => {
            containerNode = ref
          }}
          {...props}
        />
      )
    )

  beforeEach(() => {
    containerNode = undefined
  })

  it('container node should be undefined if popup is not open', () => {
    mountWrapper()

    expect(containerNode).toBeUndefined()
  })

  it('should append popup to document.body if props.isOpened is true', () => {
    mountWrapper({
      isOpened: true
    })

    expect(document.body.lastElementChild).toEqual(containerNode)
    expect(document.body.lastElementChild.childElementCount).toEqual(1)
  })

  it('should open/close popup when change props.isOpened', async done => {
    const props = {}

    const whenClose = new Promise(resolve => {
      props.onClose = resolve
    })

    const wrapper = mountWrapper(props)

    expect(containerNode).toBeUndefined()

    wrapper.setProps({
      isOpened: true
    })

    const mountNode = document.body.lastElementChild

    expect(document.body.lastElementChild).toEqual(containerNode)
    expect(document.body.lastElementChild.childElementCount).toEqual(1)

    wrapper.setProps({
      isOpened: false
    })

    await whenClose
    expect(containerNode).toBeUndefined()
    expect(mountNode).not.toEqual(document.body.lastElementChild)
    done()
  })

  it('should apply default styles', () => {
    mountWrapper({
      isOpened: true
    })

    const containerStyles = getNodeStyles(containerNode)

    expect(containerStyles.position).toEqual('absolute')
    expect(containerStyles['z-index']).toEqual(`${POPUP_ZINDEX}`)

    const popupNode = containerNode.querySelector('.popup')
    const popupStyles = getNodeStyles(popupNode)

    expect(popupStyles.position).toEqual('relative')
    expect(popupStyles.display).toEqual('inline-block')
    expect(popupStyles['font-family']).toEqual('Roboto, sans-serif')
    expect(popupStyles['font-size']).toEqual(theme.popup.text.fontSize + 'px')
    expect(popupStyles['text-align']).toEqual('left')
    expect(nc(popupStyles['background-color'])).toEqual(
      nc(theme.popup.colors.background)
    )
    expect(popupStyles.width).toEqual('350px')
    expect(popupStyles['min-width']).toEqual('350px')
    expect(popupStyles['padding-top']).toEqual('20px')
    expect(popupStyles['padding-left']).toEqual('25px')
    expect(popupStyles['padding-right']).toEqual('25px')
    expect(popupStyles['padding-bottom']).toEqual('25px')

    const backdropNode = popupNode.parentElement
    const backdropStyles = getNodeStyles(backdropNode)

    expect(backdropStyles.position).toEqual('fixed')
    expect(backdropStyles.top).toEqual('0px')
    expect(backdropStyles.left).toEqual('0px')
    expect(backdropStyles.right).toEqual('0px')
    expect(backdropStyles.bottom).toEqual('0px')
    expect(backdropStyles['padding-top']).toEqual('20px')
    expect(backdropStyles['padding-bottom']).toEqual('20px')
    expect(backdropStyles['overflow-y']).toEqual('auto')
    expect(backdropStyles['overflow-x']).toEqual('hidden')
    expect(nc(backdropStyles['background-color'])).toEqual(
      nc(theme.popup.colors.backdrop.default)
    )
  })

  it('should apply custom width', () => {
    mountWrapper({
      isOpened: true,
      children: <div style={{width: 400}}>Hi</div>
    })

    const popupNode = containerNode.querySelector('.popup')
    const popupStyles = getNodeStyles(popupNode)

    expect(popupStyles.width).toEqual('450px')
  })

  it('should not append title, buttons', () => {
    mountWrapper({
      isOpened: true,
      showClose: false
    })

    const popupNode = containerNode.querySelector('.popup')
    const title = popupNode.querySelectorAll('header')
    const buttons = popupNode.querySelectorAll('button')

    expect(title.length).toEqual(0)
    expect(buttons.length).toEqual(0)
  })

  it('should append className', () => {
    mountWrapper({
      isOpened: true,
      title: 'Foo',
      className: 'popup',
      titleClassName: 'test-title',
      backdropClassName: 'test-backdrop',
      buttonsContainerClassName: 'test-buttons',
      okButton: <Button className="ok-button">Ok</Button>
    })

    expect(containerNode.querySelector('.popup')).not.toBeUndefined()
    expect(containerNode.querySelector('.test-backdrop')).not.toBeUndefined()
    expect(containerNode.querySelector('.test-title')).not.toBeUndefined()
    expect(containerNode.querySelector('.test-buttons')).not.toBeUndefined()
  })

  it('should append styles', () => {
    const backgroundColor = nc('rgb(255, 0, 0)')
    const backdropBackgroundColor = nc('rgb(0, 0, 0)')
    const titleColor = nc('rgb(255, 0, 0)')
    const buttonsContainerColor = nc('rgb(255, 0, 0)')

    mountWrapper({
      style: {
        backgroundColor
      },
      titleStyle: {
        color: titleColor
      },
      backdropStyle: {
        backgroundColor: backdropBackgroundColor
      },
      buttonsContainerStyle: {
        backgroundColor: buttonsContainerColor
      },
      title: 'Foo',
      isOpened: true,
      okButton: <Button className="ok-button">Ok</Button>
    })

    const popupNode = containerNode.querySelector('.popup')
    const popupStyles = getNodeStyles(popupNode)

    expect(nc(popupStyles['background-color'])).toEqual(backgroundColor)

    const backdropNode = popupNode.parentElement
    const backdropStyles = getNodeStyles(backdropNode)

    expect(nc(backdropStyles['background-color'])).toEqual(
      backdropBackgroundColor
    )

    const titleNode = popupNode.querySelector('header')
    const titleStyles = getNodeStyles(titleNode)

    expect(nc(titleStyles['color'])).toEqual(titleColor)

    const footerNode = popupNode.querySelector('footer')
    const footerStyles = getNodeStyles(footerNode)

    expect(nc(footerStyles['background-color'])).toEqual(buttonsContainerColor)
  })

  it('should append custom backdrop color', () => {
    mountWrapper({
      backdropColor: 'blue',
      isOpened: true
    })

    const backdropNode = containerNode.querySelector('.popup').parentElement
    const backdropStyles = getNodeStyles(backdropNode)

    expect(nc(backdropStyles['background-color'])).toEqual(
      nc(theme.popup.colors.backdrop.blue)
    )
  })

  it('should append title', () => {
    const title = 'Hi'

    mountWrapper({
      title,
      isOpened: true
    })

    const titleNode = containerNode.querySelector('.popup header')
    const titleStyles = getNodeStyles(titleNode)

    expect(titleNode.textContent).toEqual(title)
    expect(titleStyles['font-size']).toEqual('20px')
    expect(titleStyles['font-weight']).toEqual('500')
    expect(titleStyles['line-height']).toEqual('25px')
    expect(titleStyles['margin-bottom']).toEqual('20px')
  })

  it('should append children', () => {
    const title = 'Hi'

    mountWrapper({
      children: <p>{title}</p>,
      isOpened: true
    })

    const childNode = containerNode.querySelector('.popup p')

    expect(childNode.tagName).toEqual('P')
    expect(childNode.textContent).toEqual(title)
  })

  it('should append close button', () => {
    mountWrapper({
      isOpened: true,
      showClose: true
    })

    const buttonNode = containerNode.querySelector('.popup button')
    const buttonStyles = getNodeStyles(buttonNode)

    expect(buttonStyles.position).toEqual('absolute')
    expect(buttonStyles.top).toEqual('25px')
    expect(buttonStyles.right).toEqual('25px')
    expect(buttonStyles.width).toEqual('15px')
    expect(buttonStyles.height).toEqual('15px')
  })

  it('should append action buttons', () => {
    mountWrapper({
      isOpened: true,
      okButton: <Button className="ok-button">Ok</Button>,
      cancelButton: <Button className="cancel-button">Cancel</Button>
    })

    const popupNode = containerNode.querySelector('.popup')
    const okButtonNode = popupNode.querySelector('.ok-button')
    const cancelButtonNode = popupNode.querySelector('.cancel-button')

    expect(okButtonNode.textContent).toEqual('Ok')
    expect(cancelButtonNode.textContent).toEqual('Cancel')
  })

  it('should call props.onOpen() when popup opens', async done => {
    const props = {}

    const whenOpen = new Promise(resolve => {
      props.onOpen = resolve
    })

    spyOn(props, 'onOpen').and.callThrough()
    const wrapper = mountWrapper(props)
    expect(props.onOpen).not.toHaveBeenCalled()

    wrapper.setProps({
      isOpened: true
    })

    await whenOpen
    expect(props.onOpen).toHaveBeenCalledTimes(1)
    done()
  })

  it('should call props.onRequestClose() when click on close button', async done => {
    const props = {
      isOpened: true,
      showClose: true
    }

    const whenRequestClose = new Promise(resolve => {
      props.onRequestClose = resolve
    })

    spyOn(props, 'onRequestClose').and.callThrough()
    mountWrapper(props)
    expect(props.onRequestClose).not.toHaveBeenCalled()
    containerNode.querySelector('.popup button').click()
    await whenRequestClose
    expect(props.onRequestClose).toHaveBeenCalledTimes(1)
    done()
  })

  it('should call props.onClose() when popup closes', async done => {
    const props = {
      isOpened: true
    }

    const whenClose = new Promise(resolve => {
      props.onClose = resolve
    })

    spyOn(props, 'onClose').and.callThrough()
    const wrapper = mountWrapper(props)
    expect(props.onClose).not.toHaveBeenCalled()

    wrapper.setProps({
      isOpened: false
    })

    await whenClose
    expect(props.onClose).toHaveBeenCalledTimes(1)
    done()
  })
})
