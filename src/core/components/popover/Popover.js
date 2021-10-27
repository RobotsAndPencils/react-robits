import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import classNames from 'classnames'
import { omit } from 'lodash'

import PopperManager from '../../utils/PopperManager'
import { TIMEOUT, EVENTS } from '../../constants/constants'
import layoutUtils from '../../utils/layoutUtils'

/**
 * Popovers are powerful elements similar to tooltips and powered by Popper.js that can be applies to any interactive element.
 */
export const Popover = ({
  className,
  disabled,
  delay,
  target,
  container,
  modifiers,
  open,
  innerClassName,
  noArrow,
  arrowClassName,
  placement,
  placementPrefix,
  boundariesElement,
  offset,
  children,
  innerRef,
  toggle,
  styling = {},
  ...attrs
}) => {
  const popoverContentAttrs = omit(attrs, ['disabled', 'delay', 'toggle'])
  const [_target, _setTarget] = useState(null)
  let _hideTimeout = null
  let _showTimeout = null

  const popperClasses = classNames(styling.popover, styling.show, className)

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
    if (open) {
      show()
      return
    }

    hide()
  }, [open])

  const show = () => {
    clearTimeout(_hideTimeout)
    addListeners()

    if (!open) {
      clearTimeout(_showTimeout)
      _showTimeout = setTimeout(toggleElem, getDelay('show'))
    }
  }

  const hide = () => {
    clearTimeout(_showTimeout)
    removeListeners()

    if (open) {
      clearTimeout(_hideTimeout)
      _hideTimeout = setTimeout(toggleElem, getDelay('hide'))
    }
  }

  const toggleElem = event => {
    if (disabled) {
      event.preventDefault()
      return
    }

    return toggle(event)
  }

  const addListeners = () => {
    EVENTS.CLICK.forEach(event => document.addEventListener(event, handleClick))
  }

  const removeListeners = () => {
    EVENTS.CLICK.forEach(event => {
      document.removeEventListener(event, handleClick)
    })
  }

  const handleClick = event => {
    if (!_target) {
      return
    }

    if (event.target !== _target && !_target.contains(event.target)) {
      if (_hideTimeout) {
        clearTimeout(_hideTimeout)
      }

      if (open) {
        toggleElem(event)
      }
    }
  }

  const getDelay = key => {
    key = key.toUpperCase()
    if (typeof delay === 'object') {
      return isNaN(delay[key]) ? TIMEOUT[key] : delay[key]
    }

    return delay
  }

  if (!open) {
    return null
  }

  return (
    <PopperManager
      styling={styling}
      className={popperClasses}
      target={target}
      container={container}
      modifiers={modifiers}
      offset={offset}
      open={open}
      noArrow={noArrow}
      arrowClassName={arrowClassName || styling.arrow}
      placement={placement}
      placementPrefix={placementPrefix}
      boundariesElement={boundariesElement}>
      <div ref={innerRef} {...popoverContentAttrs} className={innerClassName}>
        {children}
      </div>
    </PopperManager>
  )
}

Popover.propTypes = {
  /**
   * The class name.
   */
  className: PropTypes.string,

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
   * The modifiers object.
   */
  modifiers: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

  /**
   * Whether the popover is open, or not.
   */
  open: PropTypes.bool,

  /**
   * The inner class name.
   */
  innerClassName: PropTypes.string,

  /**
   * Whether the popover is disabled, or not.
   */
  disabled: PropTypes.bool,

  /**
   * Whether to hide the arrow, or not.
   */
  noArrow: PropTypes.bool,

  /**
   * The arrow class name.
   */
  arrowClassName: PropTypes.string,

  /**
   * The boundaries element for the Popover instance.
   */
  boundariesElement: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /**
   * The popover placement.
   */
  placement: PropTypes.string,

  /**
   * The placement prefix.
   */
  placementPrefix: PropTypes.string,

  /**
   * The popover offset.
   */
  offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * The toggle function.
   */
  toggle: PropTypes.func.isRequired,

  /**
   * The show/hide delay in ms.
   */
  delay: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      show: PropTypes.number,
      hide: PropTypes.number
    })
  ])
}

Popover.defaultProps = {
  open: false,
  noArrow: false,
  placement: 'top',
  placementPrefix: 'bs-popover',
  delay: {
    SHOW: 0,
    HIDE: 0
  },
  toggle: function () {}
}

export default ThemeWrapper(themeName => `popover/popover_${themeName}.module.scss`)(Popover)
