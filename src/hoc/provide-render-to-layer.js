import React, {Component, cloneElement, Fragment} from 'react'
import {
  unmountComponentAtNode,
  // unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer, // eslint-disable-line camelcase
  createPortal
} from 'react-dom'
import uuid from '../utils/uuid'

/**
 * Предоставляет в оборачиваемый `Target` методы монтирования/размонтирования в отделную ноду в DOM.
 *
 *  @provideRenderToLayer
 *  class Popup extends Components {
 *
 *    openPopup = () => {
 *      this.popupElement = this.props.renderToLayer(
 *        <div>
 *          <button onClick={this.closePopup}>
 *            Закрыть попап
 *          </button>
 *        </div>
 *      )
 *    }
 *
 *    closePopup = () => {
 *      this.props.unrenderAtLayer(this.popupElement)
 *    }
 *
 *    render() {
 *      return (
 *        <button onClick={this.openPopup}>
 *          Открыть попап
 *        </button>
 *      )
 *    }
 *
 *  }
 *
 * Передает в оборачиваемый компонент следующие props:
 * - renderToLayer(element) - монтирует переданный `element` в отделную ноду
 * - unrenderAtLayer(element) - размонтирует `element`
 */
export default function provideRenderToLayer(Target) {
  return class ProvideRenderToLayer extends Component {
    state = {
      isPortal: false
    }
    elements = []
    listElement = null
    wrapper = null

    componentWillUnmount() {
      this.elements = []
      this.unmountPortal()
      this.wrapper = null
    }

    renderToLayer = (element, props) => {
      const key = uuid()

      const resultElement = cloneElement(element, {
        ...props,
        key,
        isOpened: true
      })

      this.elements.push(resultElement)
      this.renderPortal()

      return resultElement
    }

    unrenderAtLayer = element => {
      const elementIndex = this.elements.indexOf(element)
      if (elementIndex < 0) return Promise.resolve()
      return new Promise(resolve => {
        const {containerRef} = element.props

        const closedElement = cloneElement(element, {
          isOpened: false,
          containerRef: ref => {
            if (containerRef) containerRef(ref)
            resolve(closedElement)
          }
        })

        this.elements[elementIndex] = closedElement
        this.renderPortal()
      }).then(closedElement => {
        this.elements = this.elements.filter(el => el !== closedElement)
        this.renderPortal()
      })
    }

    renderPortal() {
      if (this.elements.length > 0) {
        this.listElement = this.elements.map((el, i) => <div key={i}>{el}</div>)
        this.setState({
          isPortal: true
        })
        // if (!this.node) {
        //   this.node = document.createElement('div')
        //   document.body.appendChild(this.node)
        // }
        // const listElement = <div>{this.elements}</div>
        // renderSubtreeIntoContainer(this, listElement, this.node)
      } else {
        this.unmountPortal()
      }
    }

    unmountPortal() {
      if (this.wrapper) {
        this.setState({
          isPortal: false
        })
        unmountComponentAtNode(this.wrapper)
        document.body.removeChild(this.wrapper)
        this.wrapper = null
      }
      // if (this.node) {
      //   unmountComponentAtNode(this.node)
      //   document.body.removeChild(this.node)
      //   this.node = null
      // }
    }

    // render() {
    //   return (
    //     <Target
    //       {...this.props}
    //       renderToLayer={this.renderToLayer}
    //       unrenderAtLayer={this.unrenderAtLayer}
    //     />
    //   )
    // }

    getContainerElement() {
      if (!this.wrapper) {
        this.wrapper = document.createElement('div')
        document.body.appendChild(this.wrapper)
      }
      return this.wrapper
    }

    render() {
      const {isPortal} = this.state
      return (
        <Fragment>
          <Target
            {...this.props}
            renderToLayer={this.renderToLayer}
            unrenderAtLayer={this.unrenderAtLayer}
          />
          {isPortal &&
            createPortal(this.listElement, this.getContainerElement())}
        </Fragment>
      )
    }
  }
}
