import React from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import * as themes from './themes'
import classNames from 'classnames'

/**
 * Button groups allow you to group buttons together on a single line, joining their edges
 */
export const ButtonGroup = ({ styling, children, className, vertical, size, ...rest }) => {
  const classes = classNames(
    className,
    size && styling[`btn-group-${size}`],
    vertical ? styling['btn-group-vertical'] : styling['btn-group']
  )

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

ButtonGroup.propTypes = {
  /**
   * The children nodes.
   */
  children: PropTypes.node,
  /**
   * The class name.
   */
  className: PropTypes.string,
  /**
   * The size.
   */
  size: PropTypes.string,
  /**
   * Whether it is vertical, or not.
   */
  vertical: PropTypes.bool
}

export default ThemeWrapper(themes)(ButtonGroup)
