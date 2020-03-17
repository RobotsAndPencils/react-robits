import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import * as themes from './themes'
import classNames from 'classnames'

// import ReactDOM from 'react-dom'
import { Manager } from 'react-popper'

import { KEYCODES, EVENTS } from '../../constants/constants'

import { DropdownContext } from './DropdownContext'

/**
 * You can use dropdowns to display accessible contextual overlays for displaying lists of links and more.
 */
export const Dropdown = ({
  styling,
  className,
  children,
  open = false,
  group,
  size,
  nav = false,
  setActiveFromChild,
  active,
  addonType,
  toggle,
  disabled,
  inNavbar,
  direction = 'down',
  ...rest
}) => {
  useEffect(() => {
    styling.use()
    return () => {
      styling.unuse()
    }
  }, [styling])

  const containerRef = useRef(null)

  const handleListeners = () => {
    if (open) {
      addListeners()
      return
    }

    removeListeners()
  }

  const removeListeners = () => {
    EVENTS.CLICK.forEach(e => document.removeEventListener(e, handleDocumentClick, true))
  }

  useEffect(() => {
    handleListeners()
    return () => {
      removeListeners()
    }
  }, [handleListeners, removeListeners])

  useEffect(() => {
    handleListeners()
  }, [open, handleListeners])

  const addListeners = () => {
    EVENTS.CLICK.forEach(e => document.addEventListener(e, handleDocumentClick, true))
  }

  const handleDocumentClick = e => {
    if (e && (e.which === 3 || (e.type === 'keyup' && e.which !== KEYCODES.TAB))) {
      return
    }

    if (
      containerRef.current.contains(e.target) &&
      containerRef.current !== e.target &&
      (e.type !== 'keyup' || e.which === KEYCODES.TAB)
    ) {
      return
    }

    handleToggle(e)
  }

  const handleToggle = e => {
    if (disabled) {
      return e && e.preventDefault()
    }

    return toggle(e)
  }

  rest.tag = rest.tag || (nav ? 'li' : 'div')

  let subItemIsActive = false
  if (setActiveFromChild) {
    React.Children.map(children[1].props.children, dropdownItem => {
      if (dropdownItem && dropdownItem.props.active) subItemIsActive = true
    })
  }

  const classes = classNames(
    className,
    direction !== 'down' && styling.locals[`drop${direction}`],
    nav && active && styling.locals.active,
    setActiveFromChild && subItemIsActive && styling.locals.active,
    addonType && styling.locals[`input-group-${addonType}`],
    group && styling.locals['btn-group'],
    !!size && styling.locals[`btn-group-${size}`],
    !group && !addonType && styling.locals.dropdown,
    open && styling.locals.show,
    nav && styling.locals['nav-item']
  )

  return (
    <DropdownContext.Provider value={{ toggle: handleToggle, open, direction, nav }}>
      <Manager {...rest}>
        <DropdownContext.Consumer>
          {() => (
            <div ref={containerRef} className={classes}>
              {children}
            </div>
          )}
        </DropdownContext.Consumer>
      </Manager>
    </DropdownContext.Provider>
  )
}

Dropdown.propTypes = {
  /**
   * Whether it is open, or not.
   */
  open: PropTypes.bool,
  /**
   * Whether it is disabled, or not.
   */
  disabled: PropTypes.bool,
  /**
   * The toggle function.
   */
  toggle: PropTypes.func,
  /**
   * Whether it is located inside a navbar, or not.
   */
  inNavbar: PropTypes.bool,
  /**
   * The component's tag type.
   */
  tag: PropTypes.string,
  /**
   * Whether it is located inside a Nav, or not.
   */
  nav: PropTypes.bool,
  /**
   * The direction.
   */
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right'])
}

export default ThemeWrapper(themes)(Dropdown)
