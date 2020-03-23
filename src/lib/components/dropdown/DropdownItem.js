import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ThemeWrapper from '../../utils/ThemeWrapper'
import * as themes from './themes'

import { DropdownContext } from './DropdownContext'

export const DropdownItem = ({
  styling,
  className,
  children,
  header,
  divider,
  tag: Tag = 'button',
  active,
  toggle = true,
  ...rest
}) => {
  const context = useContext(DropdownContext)

  const handleClick = e => {
    if (rest.disabled || header || divider) {
      e.preventDefault()
      return
    }

    if (rest.onClick) {
      rest.onClick(e)
    }

    if (toggle) {
      context.toggle(e)
    }
  }

  const getTabIndex = () => {
    if (rest.disabled || header || divider) {
      return '-1'
    }

    return '0'
  }

  const tabIndex = getTabIndex()

  const classes = classNames(
    className,
    rest.disabled && styling.disabled,
    !divider && !header && styling['dropdown-item'],
    header && styling['dropdown-header'],
    divider && styling['dropdown-divider'],
    active && styling.active
  )

  if (Tag === 'button') {
    if (header) {
      Tag = 'h6'
    } else if (divider) {
      Tag = 'div'
    } else if (rest.href) {
      Tag = 'a'
    }
  }

  return (
    <Tag
      type={Tag === 'button' && (rest.onClick || toggle) ? 'button' : undefined}
      {...rest}
      tabIndex={tabIndex}
      className={classes}
      onClick={handleClick}>
      {children}
    </Tag>
  )
}

DropdownItem.propTypes = {
  /**
   * The children nodes.
   */
  children: PropTypes.node,
  /**
   * Whether it is active, or not.
   */
  active: PropTypes.bool,
  /**
   * Whether it is disabled, or not.
   */
  disabled: PropTypes.bool,
  /**
   * Whether it is a divider, or not.
   */
  divider: PropTypes.bool,
  /**
   * Whether it is a dropdown header item, or not.
   */
  header: PropTypes.bool,
  /**
   * The function that should be triggered on click.
   */
  onClick: PropTypes.func,
  /**
   * The class name.
   */
  className: PropTypes.string,
  /**
   * Whether it should toggle the dropdown, or not.
   */
  toggle: PropTypes.bool,
  /**
   * The component's tag type.
   */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
}

export default ThemeWrapper(themes)(DropdownItem)
