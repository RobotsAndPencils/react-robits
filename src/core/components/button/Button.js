import React from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import classNames from 'classnames'

/**
 * Generic button
 */
export const Button = React.memo(
  ({
    active,
    block,
    children,
    className = '',
    disabled = false,
    ghost,
    innerRef,
    isLoading = false,
    onClick,
    outline,
    pill,
    styling,
    styleType = 'primary',
    size,
    squared,
    tag: Tag = 'button',
    ...props
  }) => {
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
      active && styling.active,
      ghost && styling['btn-ghost']
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
)

Button.propTypes = {
  /**
   * Whether or not to display its active state
   */
  active: PropTypes.bool,
  /**
   * Whether it should be displayed as a block (full-width), or not.
   */
  block: PropTypes.bool,
  /**
   * The class name.
   */
  className: PropTypes.string,
  /**
   * The children nodes.
   */
  children: PropTypes.any.isRequired,
  /**
   * Whether it is disabled, or not. Defaults to false
   */
  disabled: PropTypes.bool,
  /**
   * Ghost buttons take on their `styleType` color for text, but no background or border
   */
  ghost: PropTypes.bool,
  /**
   * Whether the button action is in process. Defaults to false.
   */
  isLoading: PropTypes.bool,
  /**
   * The inner ref.
   * @type {[type]}
   */
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  /**
   * Click handler (explicit prop to handle disabled state)
   */
  onClick: PropTypes.func,
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
   * The style version of the button.
   */
  styleType: PropTypes.string,
  /**
   * The size.
   */
  size: PropTypes.string,
  /**
   * The component tag.
   */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
}

export default ThemeWrapper(themeName => `button/button_${themeName}.module.scss`)(Button)
