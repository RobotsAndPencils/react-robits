import React from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import classNames from 'classnames'

/**
 * Cards provide a flexible content container that you can use to display a variety of content using contextual background colors, headers and footers.
 */
export const Card = ({
  disabled,
  children,
  className = '',
  footer,
  header,
  innerRef,
  onClick,
  size,
  styling = {},
  tag: Tag = 'div',
  headerTag: HeaderTag = 'div',
  footerTag: FooterTag = 'div',
  ...props
}) => {
  const classes = classNames(className, styling.card, size && styling[`card-${size}`])

  const onClickHandler = e => {
    if (disabled) {
      e.preventDefault()
      return
    }

    if (onClick) {
      onClick(e)
    }
  }

  return (
    <Tag ref={innerRef} disabled={disabled} className={classes} onClick={onClickHandler} {...props}>
      {header ? <HeaderTag className={styling['card-header']}>{header}</HeaderTag> : []}
      {children}
      {footer ? <FooterTag className={styling['card-footer']}>{footer}</FooterTag> : []}
    </Tag>
  )
}

Card.propTypes = {
  /**
   * Whether it is disabled, or not.
   */
  disabled: PropTypes.bool,
  /**
   * The class name.
   */
  className: PropTypes.string,
  /**
   * The children nodes.
   */
  children: PropTypes.any.isRequired,
  /**
   * Optional footer content, sectioned out separately
   */
  footer: PropTypes.any,
  /**
   * Optional header content, sectioned out separately
   */
  header: PropTypes.any,
  /**
   * The inner ref.
   * @type {[type]}
   */
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  /**
   * Click handler (explicit to handle disbaled state)
   */
  onClick: PropTypes.func,
  /**
   * The size.
   */
  size: PropTypes.string
}

export default ThemeWrapper(themeName => `card/card_${themeName}.module.scss`)(Card)
