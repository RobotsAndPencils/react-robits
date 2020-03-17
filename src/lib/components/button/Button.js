import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import * as themes from './themes'
import classNames from 'classnames'

/**
 * Generic button
 */
export const Button = ({
  styling,
  children,
  isLoading = false,
  disabled = false,
  className = '',
  styleType = 'primary',
  size,
  pill,
  outline,
  squared,
  active,
  innerRef,
  tag: Tag = 'button',
  block,
  onClick,
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
    styling.locals.btn,
    isLoading && styling.locals.loading,
    disabled && styling.locals.disabled,
    styleType && styling.locals[`btn-${outline ? 'outline-' : ''}${styleType}`],
    size && styling.locals[`btn-${size}`],
    pill && styling.locals['btn-pill'],
    squared && styling.locals['btn-squared'],
    block && styling.locals['btn-block'],
    active && styling.locals.active
  )

  if (isLoading) {
    disabled = true
  }

  const onClickHandler = e => {
    if (disabled) {
      e.preventDefault()
      return
    }

    if (onClick) {
      onClick(e)
    }
  }

  Tag = props.href && Tag === 'button' ? 'a' : Tag
  const tagType = Tag === 'button' && props.onClick ? 'button' : undefined

  return (
    <Tag
      ref={innerRef}
      type={tagType}
      disabled={disabled}
      className={classes}
      onClick={onClickHandler}
      {...props}>
      {children}
    </Tag>
  )
}

Button.propTypes = {
  /**
   * Whether the button action is in process
   */
  isLoading: PropTypes.bool,
  /**
   * The class name.
   */
  className: PropTypes.string,
  /**
   * The children nodes.
   */
  children: PropTypes.any.isRequired,
  /**
   * The style version of the button.
   */
  styleType: PropTypes.string,
  /**
   * The size.
   */
  size: PropTypes.string,
  /**
   * Whether it is outline, or not.
   */
  outline: PropTypes.bool,
  /**
   * Whether it is pill, or not.
   */
  pill: PropTypes.bool,
  /**
   * Whether it is squared, or not.
   */
  squared: PropTypes.bool,
  /**
   * Whether it is active, or not.
   */
  active: PropTypes.bool,
  /**
   * Whether it should be displayed as a block (full-width), or not.
   */
  block: PropTypes.bool,
  /**
   * Whether it is disabled, or not.
   */
  disabled: PropTypes.bool,
  /**
   * The component tag.
   */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /**
   * The inner ref.
   * @type {[type]}
   */
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string])
}

export default ThemeWrapper(themes)(Button)
