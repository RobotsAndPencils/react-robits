import React from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import classNames from 'classnames'

export const ModalHeader = ({
  children,
  closeModal,
  className,
  styling = {},
  withBorder = false,
  withCloseButton,
  ...rest
}) => {
  const classes = classNames(
    className,
    styling['modal-header'],
    withBorder && styling['with-border']
  )

  return (
    <div className={classes} {...rest}>
      {children}
      {withCloseButton ? (
        <button
          type='button'
          onClick={closeModal}
          className={styling.close}
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
  /**
   * The children nodes.
   */
  children: PropTypes.any,
  /**
   * The function to call to close the modal. Triggered via the "X" icon close button, when enabled
   */
  closeModal: PropTypes.func,
  /**
   * Custom class to apply to the component
   */
  className: PropTypes.string,
  /**
   * Whether or not to include a bottom border on the component
   */
  withBorder: PropTypes.bool,
  /**
   * Whether or not to include a "X" icon to allow users to exit the modal
   */
  withCloseButton: PropTypes.bool
}

export default ThemeWrapper(themeName => `modal/modal_${themeName}.module.scss`)(ModalHeader)
