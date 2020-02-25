import React from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import * as themes from './themes'
import classNames from 'classnames'

/**
 * Cards provide a flexible content container that you can use to display a variety of content using contextual background colors, headers and footers.
 */
export const Card = ({
  styling,
  children,
  disabled,
  className = '',
  size,
  innerRef,
  onClick,
  header = 'Card Header',
  footer = 'Card Footer',
  ...props
}) => {
  const classes = classNames(
    className,
    styling.card,
    size && styling[`card-${size}`]
  )

  const onClickHandler = (e) => {
    if (disabled) {
      e.preventDefault()
      return
    }

    if (onClick) {
      onClick(e)
    }
  }

  return (
    <div
      ref={innerRef}
      disabled={disabled}
      className={classes}
      onClick={onClickHandler}
      {...props}>
      {
        header
          ? <div className={styling['card-header']}>{header}</div>
          : []
      }
      {children}
      {
        footer
          ? <div className={styling['card-footer']}>{footer}</div>
          : []
      }
    </div>
  )
}

Card.propTypes = {
  /**
   * The class name.
   */
  className: PropTypes.string,
  /**
   * The children nodes.
   */
  children: PropTypes.any.isRequired,
  /**
   * The size.
   */
  size: PropTypes.string,
  /**
   * Whether it is disabled, or not.
   */
  disabled: PropTypes.bool,
  /**
   * The inner ref.
   * @type {[type]}
   */
  innerRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.string
  ])
}

export default ThemeWrapper(themes)(Card)
