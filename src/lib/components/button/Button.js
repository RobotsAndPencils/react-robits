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
  // useEffect(() => {
  //   styling.use()
  //   return () => {
  //     styling.unuse()
  //   }
  // }, [styling])

  const classes = classNames(
    className,
    styling.btn,
    isLoading && styling.loading,
    disabled && styling.disabled,
    styleType && styling[`btn-${outline ? 'outline-' : ''}${styleType}`],
    size && styling[`btn-${size}`],
    pill && styling['btn-pill'],
    squared && styling['btn-squared'],
    block && styling['btn-block'],
    active && styling.active
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
