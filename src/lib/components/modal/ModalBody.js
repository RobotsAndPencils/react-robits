import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import * as themes from './themes'
import classNames from 'classnames'

/**
 * Modal body, with baked in padding
 */
export const ModalBody = ({ styling, children, className = '', innerRef, ...props }) => {
  useEffect(() => {
    styling.use()
    return () => {
      styling.unuse()
    }
  }, [styling])

  const classes = classNames(className, styling.locals['modal-body'])

  return (
    <div ref={innerRef} className={classes} {...props}>
      {children}
    </div>
  )
}

ModalBody.propTypes = {
  /**
   * The class name.
   */
  className: PropTypes.string,
  /**
   * The children nodes.
   */
  children: PropTypes.any.isRequired,
  /**
   * The inner ref.
   * @type {[type]}
   */
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string])
}

export default ThemeWrapper(themes)(ModalBody)
