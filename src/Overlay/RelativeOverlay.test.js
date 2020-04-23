import React, {Component} from 'react'
import PropTypes from 'prop-types'
import RelativeOverlay from './RelativeOverlay'
import {withTheme, mount, getNodeStyles, getWrapperNode} from '../../test/utils'

class Content extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    pointX: PropTypes.oneOf(['left', 'right', 'center']),
    pointY: PropTypes.oneOf(['top', 'bottom', 'center']),
    onBecomeVisible: PropTypes.func,
    onBecomeInvisible: PropTypes.func,
    anchorWidth: PropTypes.number,
    anchorHeight: PropTypes.number
  }

  componentDidUpdate(prevProps) {
    if (this.props.isVisible !== prevProps.isVisible)
      if (this.props.isVisible) this.props.onBecomeVisible()
      else this.props.onBecomeInvisible()
  }

  render() {
    return (
      <div
        className="content-body"
        style={{
          padding: '20px',
          opacity: this.props.isVisible ? 1 : 0,
          background: 'rgba(0,0,0,.4)'
        }}>
        Content
      </div>
    )
  }
}

function Anchor({style = {}}) {
  return (
    <div
      className="anchor"
      style={{border: '1px solid black', padding: '10px', ...style}}>
      anchor
    </div>
  )
}

describe('<RelativeOverlay />', () => {
  let callbacks, whenContentShow, whenContentHide, wrapper

  const mountWrapper = (props, anchorProps = {}) => {
    wrapper = mount(
      withTheme(
        <RelativeOverlay
          isOpened={false}
          anchor={() => <Anchor {...anchorProps} />}
          content={<Content />}
          onContentOpen={callbacks.onContentOpen}
          onContentClose={callbacks.onContentClose}
          {...props}
        />
      )
    )
  }

  beforeEach(() => {
    callbacks = {}
    whenContentShow = new Promise(resolve => {
      callbacks.onContentOpen = resolve
    })
    whenContentHide = new Promise(resolve => {
      callbacks.onContentClose = resolve
    })
    spyOn(callbacks, 'onContentOpen').and.callThrough()
    spyOn(callbacks, 'onContentClose').and.callThrough()
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('show/hide', async done => {
    mountWrapper({
      anchorPointX: 'right',
      anchorPointY: 'center',
      contentPointX: 'left',
      contentPointY: 'center'
    })
    await new Promise(resolve => {
      wrapper.setProps({isOpened: true}, resolve)
    })
    expect(callbacks.onContentOpen).not.toHaveBeenCalled()
    expect(callbacks.onContentClose).not.toHaveBeenCalled()
    await whenContentShow
    const rootNode = getWrapperNode(wrapper)
    const contentNode = rootNode.querySelector('.anchor + div')
    const rootStyles = getNodeStyles(rootNode)
    const contentBodyStyles = getNodeStyles(
      contentNode.querySelector('.content-body')
    )
    const contentStyles = getNodeStyles(contentNode)
    expect(callbacks.onContentOpen).toHaveBeenCalledTimes(1)
    expect(callbacks.onContentClose).not.toHaveBeenCalled()
    expect(contentBodyStyles.opacity).toBe('1')
    expect(rootStyles.display).toBe('inline-block')
    expect(rootStyles.position).toBe('relative')
    expect(contentStyles.position).toBe('absolute')
    await new Promise(resolve => {
      wrapper.setProps({isOpened: false}, resolve)
    })
    await whenContentHide
    expect(callbacks.onContentClose).toHaveBeenCalledTimes(1)
    expect(rootNode.querySelector('.anchor + div')).toBe(null)
    done()
  })

  it('anchor: right/center, content: left/center', async done => {
    mountWrapper({
      anchorPointX: 'right',
      anchorPointY: 'center',
      contentPointX: 'left',
      contentPointY: 'center'
    })
    await new Promise(resolve => {
      wrapper.setProps({isOpened: true}, resolve)
    })
    await whenContentShow
    const rootNode = getWrapperNode(wrapper)
    const contentNode = rootNode.querySelector('.anchor + div')
    expect(contentNode.style.left).toBe('100%')
    expect(contentNode.style.top).toBe('50%')
    expect(contentNode.style.transform).toBe('translate(0%, -50%)')
    done()
  })

  it('anchor: right/center, content: left/center, autoPositionX=true', async done => {
    mountWrapper({
      anchorPointX: 'right',
      anchorPointY: 'center',
      contentPointX: 'left',
      contentPointY: 'center',
      autoPositionX: true,
      style: {
        position: 'fixed',
        right: 0,
        top: 0
      }
    })
    await new Promise(resolve => {
      wrapper.setProps({isOpened: true}, resolve)
    })
    await whenContentShow
    const rootNode = getWrapperNode(wrapper)
    const contentNode = rootNode.querySelector('.anchor + div')
    expect(contentNode.style.right).toBe('100%')
    expect(contentNode.style.top).toBe('50%')
    expect(contentNode.style.transform).toBe('translate(0%, -50%)')
    done()
  })

  it('anchor: right/center, content: left/center, autoPositionY=true', async done => {
    mountWrapper({
      anchorPointX: 'left',
      anchorPointY: 'top',
      contentPointX: 'left',
      contentPointY: 'bottom',
      autoPositionY: true,
      style: {
        position: 'fixed',
        right: 0,
        top: 0
      }
    })
    await new Promise(resolve => {
      wrapper.setProps({isOpened: true}, resolve)
    })
    await whenContentShow
    const rootNode = getWrapperNode(wrapper)
    const contentNode = rootNode.querySelector('.anchor + div')
    expect(contentNode.style.left).toBe('0%')
    expect(contentNode.style.top).toBe('100%')
    expect(contentNode.style.transform).toBe('translate(0%, 0%)')
    done()
  })

  it('anchor: center/bottom, content: center/top, autoPositionX=true', async done => {
    mountWrapper({
      anchorPointX: 'center',
      anchorPointY: 'bottom',
      contentPointX: 'center',
      contentPointY: 'top',
      autoPositionX: true,
      style: {
        position: 'fixed',
        right: 0,
        top: 0
      }
    })
    await new Promise(resolve => {
      wrapper.setProps({isOpened: true}, resolve)
    })
    await whenContentShow
    const rootNode = getWrapperNode(wrapper)
    const contentNode = rootNode.querySelector('.anchor + div')
    expect(contentNode.style.right).toBe('0%')
    expect(contentNode.style.top).toBe('100%')
    expect(contentNode.style.transform).toBe('translate(0%, 0%)')
    done()
  })
})
