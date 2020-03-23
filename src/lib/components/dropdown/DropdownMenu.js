import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import * as themes from './themes'
import classNames from 'classnames'
import { Popper } from 'react-popper'

import { DropdownContext } from './DropdownContext'
import { DROPDOWN_POSITION_MAP } from '../../constants/constants'

export const DropdownMenu = ({
  styling,
  className,
  children,
  right,
  tag: Tag = 'div',
  size,
  modifiers,
  persist,
  flip = true,
  ...rest
}) => {
  const context = useContext(DropdownContext)

  const classes = classNames(
    className,
    styling['dropdown-menu'],
    size && styling[`dropdown-menu-${size}`],
    right && styling['dropdown-menu-right'],
    context.open && styling.show
  )

  if (persist || (context.open && !context.inNavbar)) {
    const pos1 = DROPDOWN_POSITION_MAP[context.direction.toUpperCase()] || 'bottom'
    const pos2 = right ? 'end' : 'start'
    rest.placement = `${pos1}-${pos2}`
    rest.component = Tag
    rest.modifiers = !flip
      ? {
        ...modifiers,
        ...{
          flip: {
            enabled: false
          }
        }
      }
      : modifiers

    return (
      <Popper {...rest}>
        {({ ref, placement }) => (
          <div
            ref={ref}
            className={classes}
            x-placement={placement}
            aria-hidden={!context.open}
            tabIndex='-1'
            role='menu'>
            {children}
          </div>
        )}
      </Popper>
    )
  }

  return (
    <Tag tabIndex='-1' role='menu' {...rest} className={classes}>
      {children}
    </Tag>
  )
}

DropdownMenu.propTypes = {
  /**
   * The component tag.
   */
  tag: PropTypes.string,
  /**
   * The children nodes.
   */
  children: PropTypes.node.isRequired,
  /**
   * Whether it is positioned on the right side, or not.
   */
  right: PropTypes.bool,
  /**
   * Whether it should flip, or not.
   */
  flip: PropTypes.bool,
  /**
   * Size of the dropdown
   */
  size: PropTypes.string,
  /**
   * The modifiers config object.
   */
  modifiers: PropTypes.object,
  /**
   * The class name.
   */
  className: PropTypes.string,
  /**
   * Whether it should persist, or not.
   */
  persist: PropTypes.bool
}

export default ThemeWrapper(themes)(DropdownMenu)
