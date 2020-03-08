import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import * as themes from './themes'
import classNames from 'classnames'

/**
 * Generic badge
 */
export const Badge = ({
  styling,
  children,
  tag: Tag = 'span',
  className,
  styleType = 'primary',
  pill = false,
  outline = false,
  squared = false,
  removable = false,
  removeHandler,
  ...props
}) => {
  useEffect(() => {
    styling.use()
    return () => {
      styling.unuse()
    }
  }, [styling])

  const classes = classNames(
    className,
    styling.locals.badge,
    styleType && !outline && styling.locals[`badge-${styleType}`],
    outline && styling.locals[`badge-outline-${styleType}`],
    pill && styling.locals['badge-pill'],
    squared && styling.locals['badge-squared'],
    removable && styling.locals.removable
  )

  Tag = props.href && Tag === 'span' ? 'a' : Tag

  return (
    <Tag
      className={classes}
      {...props}>
      {children}
      {
        removable
          ? (
            <span className={styling.locals.remove} onClick={removeHandler}>
              <svg width='24px' height='24px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg'>
                <path d='M21.9,23.3 L12,13.4 L2.1,23.3 C1.7,23.7 1.1,23.7 0.7,23.3 C0.3,22.9 0.3,22.3 0.7,21.9 L10.6,12 L0.7,2.1 C0.3,1.7 0.3,1.1 0.7,0.7 C1.1,0.3 1.7,0.3 2.1,0.7 L12,10.6 L21.9,0.7 C22.3,0.3 22.9,0.3 23.3,0.7 C23.7,1.1 23.7,1.7 23.3,2.1 L13.4,12 L23.3,21.9 C23.7,22.3 23.7,22.9 23.3,23.3 C22.9,23.7 22.3,23.7 21.9,23.3 Z' />
              </svg>
            </span>
          )
          : []
      }
    </Tag>
  )
}

Badge.propTypes = {
  /**
   * The children nodes.
   */
  children: PropTypes.node,
  /**
   * The class name.
   */
  className: PropTypes.string,
  /**
   * The styling color.
   */
  styleType: PropTypes.string,
  /**
   * Whether it should be outlined, or not.
   */
  outline: PropTypes.bool,
  /**
   * Whether it should be a pill, or not.
   */
  pill: PropTypes.bool,
  /**
   * The component tag.
   */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
}

export default ThemeWrapper(themes)(Badge)
