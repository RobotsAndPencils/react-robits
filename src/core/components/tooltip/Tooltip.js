import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { omit } from 'lodash'
import ThemeWrapper from '../../utils/ThemeWrapper'

import { TIMEOUT, EVENTS, POPPER_PLACEMENTS } from '../../constants/constants'
import PopperManager from '../../utils/PopperManager'
import domUtils from '../../utils/domUtils'

/**
 * Tooltips are powerful components powered behind the scenes by Popper.js that can be attached to any element.
 */
export class Tooltip extends React.Component {
  constructor (props) {
    super(props)

    this._target = null
    this._hideTimeout = null
    this._showTimeout = null
  }

  componentDidMount () {
    this._target = domUtils.getTarget(this.props.target)
    this.addListeners()
  }

  componentWillUnmount () {
    clearTimeout(this._hideTimeout)
    clearTimeout(this._showTimeout)
    this.removeListeners()
  }

  addListeners = () => {
    const triggers = this.props.trigger.trim().split(/\s+/)

    triggers.forEach(trigger => {
      switch (trigger) {
        case 'click':
          EVENTS.CLICK.forEach(e => document.addEventListener(e, this))
          break

        case 'hover':
          EVENTS.MOUSE.forEach(e => this._target.addEventListener(e, this))
          break

        case 'focus':
          EVENTS.FOCUS.forEach(e => this._target.addEventListener(e, this))
          break

        default:
          break
      }
    }, this)
  }

  removeListeners = () => {
    EVENTS.CLICK.forEach(e => document.removeEventListener(e, this), this)
    EVENTS.MOUSE.concat(EVENTS.FOCUS).forEach(e => this._target.removeEventListener(e, this), this)
  }

  handleEvent = e => {
    if (this.props.disabled || this._target === null) {
      return
    }

    switch (e.type) {
      case 'click':
      case 'touchstart':
        this.handleClick(e)
        break

      case 'mouseenter':
        this.handleMouseEnter(e)
        break

      case 'mouseleave':
        this.handleMouseLeave(e)
        break

      case 'focusin':
        this.show(e)
        break

      case 'focusout':
        this.hide(e)
        break

      default:
        break
    }
  }

  handleClick = e => {
    if (this._target !== null && (e.target === this._target || this._target.contains(e.target))) {
      if (this._hideTimeout) {
        clearTimeout(this._hideTimeout)
      }

      if (!this.props.open) {
        this.toggle(e)
      }

      return
    }

    if (this.props.open && e.target.getAttribute('role') !== 'tooltip') {
      if (this._showTimeout) {
        clearTimeout(this._showTimeout)
      }

      this._hideTimeout = setTimeout(this.hide.bind(this, e), this.getDelay('hide'))
    }
  }

  handleMouseEnter = e => {
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout)
    }

    this._showTimeout = setTimeout(this.show.bind(this, e), this.getDelay('show'))
  }

  handleMouseLeave = e => {
    if (this._showTimeout) {
      clearTimeout(this._showTimeout)
    }

    this._hideTimeout = setTimeout(this.hide.bind(this, e), this.getDelay('hide'))
  }

  handleMouseOverContent = () => {
    if (this.props.autohide) {
      return
    }

    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout)
    }
  }

  handleMouseLeaveContent = e => {
    if (this.props.autohide) {
      return
    }

    if (this._showTimeout) {
      clearTimeout(this._showTimeout)
    }

    e.persist()
    this._hideTimeout = setTimeout(this.hide.bind(this, e), this.getDelay('hide'))
  }

  getDelay = key => {
    key = key.toUpperCase()
    if (typeof this.props.delay === 'object') {
      return isNaN(this.props.delay[key]) ? TIMEOUT[key] : this.props.delay[key]
    }

    return this.props.delay
  }

  show = e => {
    if (!this.props.open) {
      clearTimeout(this._showTimeout)
      this.toggle(e)
    }
  }

  hide = e => {
    if (this.props.open) {
      clearTimeout(this._hideTimeout)
      this.toggle(e)
    }
  }

  toggle = e => {
    if (this.props.disabled) {
      return e && e.preventDefault()
    }

    return this.props.toggle(e)
  }

  render () {
    const _props = omit(this.props, [
      'trigger',
      'disabled',
      'delay',
      'toggle',
      'autohide',
      'themeName',
      'styling'
    ])
    const {
      target,
      container,
      open,
      className,
      arrowClassName,
      innerClassName,
      boundariesElement,
      placement,
      placementPrefix,
      modifiers,
      offset,
      noArrow,
      children,
      ...attrs
    } = _props

    if (!open) {
      return null
    }

    const classes = classNames(this.props.styling['tooltip-inner'], innerClassName)

    const popperClasses = classNames(this.props.styling.tooltip, this.props.styling.show, className)

    console.log(attrs)

    return (
      <PopperManager
        styling={this.props.styling}
        container={container}
        className={popperClasses}
        arrowClassName={arrowClassName || this.props.styling.arrow}
        target={target}
        open={open}
        noArrow={noArrow}
        boundariesElement={boundariesElement}
        placement={placement}
        placementPrefix={placementPrefix}
        modifiers={modifiers}
        offset={offset}>
        <div
          className={classes}
          role='tooltip'
          aria-hidden={open}
          onMouseOver={this.handleMouseOverContent}
          onMouseLeave={this.handleMouseLeaveContent}>
          {children}
        </div>
      </PopperManager>
    )
  }
}

Tooltip.propTypes = {
  /**
   * The target element.
   */
  target: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.element,
    PropTypes.shape({ current: PropTypes.any })
  ]).isRequired,

  /**
   * The tooltip container.
   */
  container: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.element,
    PropTypes.shape({ current: PropTypes.any })
  ]),

  /**
   * The trigger(s) (click, hover, focus).
   */
  trigger: PropTypes.string,

  /**
   * Whether the tooltip is open, or not.
   */
  open: PropTypes.bool,

  /**
   * Whether the tooltip is disabled, or not.
   */
  disabled: PropTypes.bool,

  /**
   * The tooltip class name.
   */
  className: PropTypes.string,

  /**
   * The arrow class name.
   */
  arrowClassName: PropTypes.string,

  /**
   * The tooltip inner class name.
   */
  innerClassName: PropTypes.string,

  /**
   * The tooltip offset.
   */
  offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * The show/hide delay in ms.
   */
  delay: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      SHOW: PropTypes.number,
      HIDE: PropTypes.number
    })
  ]),

  /**
   * The boundaries element for the tooltip instance.
   */
  boundariesElement: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /**
   * The tooltip placement.
   */
  placement: PropTypes.oneOf(POPPER_PLACEMENTS),

  /**
   * The placement prefix.
   */
  placementPrefix: PropTypes.string,

  /**
   * Whether to hide the arrow, or not.
   */
  noArrow: PropTypes.bool,

  /**
   * The toggle function.
   */
  toggle: PropTypes.func.isRequired,

  /**
   * Popper modifiers object.
   */
  modifiers: PropTypes.object,

  /**
   * Whether the tooltip should auto-hide, or not.
   */
  autohide: PropTypes.bool
}

Tooltip.defaultProps = {
  trigger: 'hover',
  open: false,
  disabled: false,
  noArrow: false,
  placement: 'top',
  placementPrefix: 'bs-tooltip',
  autohide: true,
  delay: {
    SHOW: 0,
    HIDE: 0
  },
  toggle: function () {}
}

export default ThemeWrapper(themeName => `tooltip/tooltip_${themeName}.module.scss`)(Tooltip)
