import React from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import classNames from 'classnames'

const PopoverBody = ({ styling, className, tag: Tag = 'div', ...rest }) => {
  const classes = classNames(className, styling['popover-body'])

  return <Tag {...rest} className={classes} />
}

PopoverBody.propTypes = {
  /**
   * The class name.
   */
  className: PropTypes.string,
  /**
   * The component's tag type.
   */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
}

export default ThemeWrapper(themeName => `popover/popover_${themeName}.module.scss`)(PopoverBody)
