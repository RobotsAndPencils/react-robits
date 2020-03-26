import React from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import * as themes from './themes'

const ModalHeader = ({ children, styling, withCloseButton, closeModal }) => {
  return (
    <div className={styling['modal-header']}>
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
