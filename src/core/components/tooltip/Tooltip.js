import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ThemeWrapper from '../../utils/ThemeWrapper'

import { TIMEOUT, EVENTS, POPPER_PLACEMENTS } from '../../constants/constants'
import PopperManager from '../../utils/PopperManager'
import domUtils from '../../utils/domUtils'

/**
 * Tooltips offer streamlined incremental content, are powered behind the scenes by Popper.js, and can be attached to any element.
 */

export const Tooltip = ({
  arrowClassName,
  autohide = true,
  boundariesElement,
  className,
  container,
  delay = {
    show: 0,
    hide: 0
  },
  disabled = false,
  innerClassName,
  modifiers,
  noArrow = false,
  offset,
  open = false,
  placement = 'top',
  placementPrefix = 'bs-tooltip',
  styling,
  target,
  toggle = () => {},
  trigger = 'hover',
  ...rest
}) => {
  let _target = null
  let _hideTimeout = null
  let _showTimeout = null

  useEffect(() => {
    _target = domUtils.getTarget(target)
    addListeners()

    return () => {
      clearTimeout(_hideTimeout)
      clearTimeout(_showTimeout)
      removeListeners()
    }
  }, [])

  const addListeners = () => {
    const triggers = trigger.trim().split(/\s+/)

    triggers.forEach(trigger => {
      switch (trigger) {
        case 'click':
          EVENTS.CLICK.forEach(e => document.addEventListener(e, handleEvent))
          break

        case 'hover':
          EVENTS.MOUSE.forEach(e => _target.addEventListener(e, handleEvent))
          break

        case 'focus':
          EVENTS.FOCUS.forEach(e => _target.addEventListener(e, handleEvent))
          break

        default:
          break
      }
    })
  }

  const removeListeners = () => {
    EVENTS.CLICK.forEach(e => document.removeEventListener(e, this), this)
    EVENTS.MOUSE.concat(EVENTS.FOCUS).forEach(e => _target.removeEventListener(e, this), this)
  }

  const handleEvent = e => {
    if (disabled || _target === null) {
      return
    }

    switch (e.type) {
      case 'click':
      case 'touchstart':
        handleClick(e)
        break

      case 'mouseenter':
        handleMouseEnter(e)
        break

      case 'mouseleave':
        handleMouseLeave(e)
        break

      case 'focusin':
        show(e)
        break

      case 'focusout':
        hide(e)
        break

      default:
        break
    }
  }

  const handleClick = e => {
    if (_target !== null && (e.target === _target || _target.contains(e.target))) {
      if (_hideTimeout) {
        clearTimeout(_hideTimeout)
      }

      if (!open) {
        handleToggle(e)
      }

      return
    }

    if (open && e.target.getAttribute('role') !== 'tooltip') {
      if (_showTimeout) {
        clearTimeout(_showTimeout)
      }

      _hideTimeout = setTimeout(hide, getDelay('hide'))
    }
  }

  const handleMouseEnter = e => {
    if (_hideTimeout) {
      clearTimeout(_hideTimeout)
    }

    _showTimeout = setTimeout(show, getDelay('show'))
  }

  const handleMouseLeave = e => {
    console.log('handleMouseLeave')
    if (_showTimeout) {
      clearTimeout(_showTimeout)
    }

    _hideTimeout = setTimeout(hide, getDelay('hide'))
  }

  const handleMouseOverContent = () => {
    if (autohide) {
      return
    }

    if (_hideTimeout) {
      clearTimeout(_hideTimeout)
    }
  }

  const handleMouseLeaveContent = e => {
    if (autohide) {
      return
    }

    if (_showTimeout) {
      clearTimeout(_showTimeout)
    }

    e.persist()
    _hideTimeout = setTimeout(hide, getDelay('hide'))
  }

  const getDelay = key => {
    key = key.toUpperCase()
    if (typeof delay === 'object') {
      return isNaN(delay[key]) ? TIMEOUT[key] : delay[key]
    }

    return delay
  }

  const show = e => {
    // if (!open) {
    clearTimeout(_showTimeout)
    handleToggle(e)
    // }
  }

  const hide = e => {
    console.log('hide', open)
    // if (open) {
    clearTimeout(_hideTimeout)
    handleToggle(e)
    // }
  }

  const handleToggle = e => {
    if (disabled) {
      return e && e.preventDefault()
    }

    return toggle(e)
  }

  if (!open) {
    return null
  }

  const classes = classNames(styling['tooltip-inner'], innerClassName)

  const popperClasses = classNames(styling.tooltip, styling.show, className)

  return (
    <PopperManager
      styling={styling}
      container={container}
      className={popperClasses}
      arrowClassName={arrowClassName || styling.arrow}
      target={target}
      open={open}
      noArrow={noArrow}
      boundariesElement={boundariesElement}
      placement={placement}
      placementPrefix={placementPrefix}
      modifiers={modifiers}
      offset={offset}>
      <div
        {...rest}
        className={classes}
        role='tooltip'
        aria-hidden={open}
        onMouseOver={handleMouseOverContent}
        onMouseLeave={handleMouseLeaveContent}
      />
    </PopperManager>
  )
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
      show: PropTypes.number,
      hide: PropTypes.number
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

export default ThemeWrapper(themeName => `tooltip/tooltip_${themeName}.module.scss`)(Tooltip)
