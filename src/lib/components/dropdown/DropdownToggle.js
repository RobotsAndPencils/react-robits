import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Reference } from 'react-popper'
import ThemeWrapper from '../../utils/ThemeWrapper'
import * as themes from './themes'
import classNames from 'classnames'
import Button from '../button/Button'

import { DropdownContext } from './DropdownContext'

export const DropdownToggle = ({
  styling,
  className,
  styleType = 'primary',
  caret,
  split,
  nav,
  tag,
  onClick,
  // 'aria-haspopup' = true,
  ...rest
}) => {
  const context = useContext(DropdownContext)

  const handleClick = e => {
    if (rest.disabled) {
      e.preventDefault()
      return
    }

    if (nav && !tag) {
      e.preventDefault()
    }

    if (onClick) {
      onClick(e)
    }

    context.toggle(e)
  }

  const ariaLabel = rest['aria-label'] || 'Toggle Dropdown'
  const classes = classNames(
    className,
    (caret || split) && styling['dropdown-toggle'],
    split && styling['dropdown-toggle-split'],
    rest.size && styling[rest.size],
    nav && styling['nav-link']
  )

  const dropdownChildren = rest.children || <span className='sr-only'>{ariaLabel}</span>

  let Tag

  if (nav && !tag) {
    Tag = 'a'
    rest.href = '#'
  } else if (!tag) {
    Tag = Button
    rest.styleType = styleType
  } else {
    Tag = tag
  }

  if (context.inNavbar) {
    return (
      <Reference>
        {() => (
          <Tag {...rest} className={classes} onClick={handleClick} aria-expanded={context.open}>
            {dropdownChildren}
          </Tag>
        )}
      </Reference>
    )
  }

  return (
    <Reference>
      {() => (
        <Tag {...rest} className={classes} onClick={handleClick} aria-expanded={context.open}>
          {dropdownChildren}
        </Tag>
      )}
    </Reference>
  )
}

DropdownToggle.propTypes = {
  /**
   * Whether it should display a caret, or not.
   */
  caret: PropTypes.bool,
  /**
   * The styleType color.
   */
  styleType: PropTypes.string,
  /**
   * The children nodes.
   */
  children: PropTypes.node,
  /**
   * The class name.
   */
  className: PropTypes.string,
  /**
   * Whether it is disabled, or not.
   */
  disabled: PropTypes.bool,
  /**
   * The function that should be triggered on click.
   */
  onClick: PropTypes.func,
  /**
   * The aria-haspopup attribute.
   */
  'aria-haspopup': PropTypes.bool,
  /**
   * Whether it is split, or not.
   */
  split: PropTypes.bool,
  /**
   * Whether it is located inside a nav, or not.
   */
  nav: PropTypes.bool,
  /**
   * The component's tag type.
   */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
}

export default ThemeWrapper(themes)(DropdownToggle)
