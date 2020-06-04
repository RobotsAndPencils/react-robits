import React from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import classNames from 'classnames'

const PopoverHeader = ({ styling, className, tag: Tag = 'h3', ...rest }) => {
  const classes = classNames(className, styling['popover-header'])

  return <Tag {...rest} className={classes} />
}

PopoverHeader.propTypes = {
  /**
   * The class name.
   */
  className: PropTypes.string,
  /**
   * The tag type.
   */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
}

export default ThemeWrapper(themeName => `popover/popover_${themeName}.module.scss`)(PopoverHeader)
