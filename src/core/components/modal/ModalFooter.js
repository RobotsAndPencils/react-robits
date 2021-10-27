import React from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import classNames from 'classnames'

export const ModalFooter = ({ children, className, styling = {}, ...rest }) => {
  const classes = classNames(className, styling['modal-footer'])
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

ModalFooter.propTypes = {
  children: PropTypes.any
}

export default ThemeWrapper(themeName => `modal/modal_${themeName}.module.scss`)(ModalFooter)
