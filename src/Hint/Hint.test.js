import React from 'react'
import Hint from './Hint'
import {withTheme, mount, getStyles, getNodeStyles} from '../utils/test-utils'
import theme from '../theme/base'
import {normalize as nc} from '../utils/colors'

describe('<Hint />', () => {
  const mountWrapper = props =>
    mount(
      withTheme(
        <Hint className="anchor" {...props}>
          Hello world
        </Hint>
      )
    )

  it('should open hint content when change props.isOpened', () => {
    const wrapper = mountWrapper({contentClassName: 'hint-content-1'})
    let contentNode = document.querySelector('.hint-content-1')

    expect(contentNode).toEqual(null)

    wrapper.setProps({
      isOpened: true
    })

    contentNode = document.querySelector('.hint-content-1')

    expect(document.body.lastElementChild).toEqual(contentNode.parentNode)
    expect(document.body.lastElementChild.childElementCount).toEqual(1)
  })

  it('should apply default styles', async () => {
    const wrapper = mountWrapper({
      isOpened: true,
      contentClassName: 'hint-content-2'
    })

    await new Promise(resolve => setTimeout(resolve, 66))

    const anchorStyles = getStyles(wrapper)

    expect(anchorStyles.width).toEqual('15px')
    expect(anchorStyles.height).toEqual('15px')
    expect(nc(anchorStyles.fill)).toEqual(nc(theme.hint.icon.colors.active))

    const contentNode = document.querySelector('.hint-content-2')
    const contentStyles = getNodeStyles(contentNode)

    expect(contentStyles.position).toEqual('relative')
    expect(contentStyles.top).toEqual('-15px')
    expect(contentStyles.width).toEqual('265px')
    expect(contentStyles['padding-top']).toEqual('15px')
    expect(contentStyles['padding-bottom']).toEqual('15px')
    expect(nc(contentStyles['background-color'])).toEqual(
      nc(theme.hint.colors.background)
    )
    expect(contentStyles['font-size']).toEqual(theme.hint.fontSize + 'px')
  })
})
