import React from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../../ThemeWrapper'
import defaultStyles from './primaryButton.module.scss'

const PrimaryButton = ({styling, children, isLoading = false, disabled = false, className = '', ...props}) => {
  let classes = className + ` ${styling['primary-button']} ${isLoading ? styling['loading'] : ''} ${disabled ? styling['disabled'] : ''}`

  if (isLoading) {
    disabled = true
  }

  return (
    <button type='button' disabled={disabled} className={classes} {...props}>
      {children}
    </button>
  )
}

PrimaryButton.propTypes = {
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.any.isRequired
}

export default ThemeWrapper({defaultStyles})(PrimaryButton)
