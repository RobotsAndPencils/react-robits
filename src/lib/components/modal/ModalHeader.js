import React from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import * as themes from './themes'
import classNames from 'classnames'

const ModalHeader = ({ children, styling, withCloseButton, closeModal, className, ...rest }) => {
  const classes = classNames(className, styling['modal-header'])

  return (
    <div className={classes} {...rest}>
      {children}
      {withCloseButton ? (
        <button
          type='button'
          onClick={closeModal}
          class={styling.close}
          data-dismiss='modal'
          aria-label='Close'>
          <span aria-hidden='true'>×</span>
        </button>
      ) : (
        []
      )}
    </div>
  )
}

ModalHeader.propTypes = {
  children: PropTypes.any
}

export default ThemeWrapper(themes)(ModalHeader)
