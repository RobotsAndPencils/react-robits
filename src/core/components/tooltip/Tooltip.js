import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import classNames from 'classnames'

import { EVENTS, POPPER_PLACEMENTS, TIMEOUT } from '../../constants/constants'
import PopperManager from '../../utils/PopperManager'
import layoutUtils from '../../utils/layoutUtils'

/**
 * Tooltips are powerful components powered behind the scenes by Popper.js that can be attached to any element.
 */

export const Tooltip = ({
  target,
  container = 'body',
  trigger,
  open,
  disabled,
  className,
  arrowClassName,
  innerClassName,
  offset,
  delay,
  boundariesElement,
  placement,
  placementPrefix,
  noArrow,
  toggle,
  modifiers,
  autohide,
  styling = {},
  children
}) => {
  const [_target, _setTarget] = useState(null)
  const openRef = useRef(false)
  let _hideTimeout = null
  let _showTimeout = null

  useEffect(() => {
    _setTarget(layoutUtils.getTarget(target))

    return () => {
      clearTimeout(_showTimeout)
      clearTimeout(_hideTimeout)
      removeListeners()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (_target) {
      addListeners()
    }
  }, [_target])

  useEffect(() => {
    openRef.current = open
  }, [open])

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
    if (EVENTS && EVENTS.CLICK && EVENTS.CLICK.length && document) {
      for (const e of EVENTS.CLICK) {
        document.removeEventListener(e, handleEvent)
      }
    }

    if (EVENTS && EVENTS.MOUSE && EVENTS.MOUSE.length && _target) {
      const allEvents =
        EVENTS.FOCUS && EVENTS.FOCUS.length ? EVENTS.MOUSE.concat(EVENTS.FOCUS) : EVENTS.MOUSE

      for (const e of allEvents) {
        _target.removeEventListener(e, handleEvent)
      }
    }
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

      if (!openRef.current) {
        toggle(e)
      }

      return
    }

    if (openRef.current && e.target.getAttribute('role') !== 'tooltip') {
      if (_showTimeout) {
        clearTimeout(_showTimeout)
      }

      _hideTimeout = setTimeout(e => hide(e), getDelay('hide'))
    }
  }

  const handleMouseEnter = e => {
    if (_hideTimeout) {
      clearTimeout(_hideTimeout)
    }

    _showTimeout = setTimeout(e => show(e), getDelay('show'))
  }

  const handleMouseLeave = e => {
    if (_showTimeout) {
      clearTimeout(_showTimeout)
    }

    _hideTimeout = setTimeout(e => hide(e), getDelay('hide'))
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
    _hideTimeout = setTimeout(e => hide(e), getDelay('hide'))
  }

  const getDelay = key => {
    key = key.toUpperCase()
    if (typeof delay === 'object') {
      return isNaN(delay[key]) ? TIMEOUT[key] : delay[key]
    }

    return delay
  }

  const show = e => {
    if (!openRef.current) {
      clearTimeout(_showTimeout)
      toggleElem(e)
    }
  }

  const hide = e => {
    if (openRef.current) {
      clearTimeout(_hideTimeout)
      toggleElem(e)
    }
  }

  const toggleElem = e => {
    if (disabled) {
      return e && e.preventDefault()
    }

    return toggle(openRef.current, e)
  }

  if (!open) {
    return null
  }

  const innerContentClasses = classNames(styling['tooltip-inner'], innerClassName)

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
        className={innerContentClasses}
        role='tooltip'
        aria-hidden={open}
        onMouseOver={handleMouseOverContent}
        onMouseLeave={handleMouseLeaveContent}>
        {children}
      </div>
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
  noArrow: true,
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
