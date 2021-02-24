import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import classNames from 'classnames'
import { Transition } from 'react-transition-group'

/**
 * A dialog overlay
 */
export const Modal = ({
  animation,
  backdrop = true,
  backdropClassName,
  className,
  children,
  closeOnBackdropClick = true,
  centered,
  footer,
  header,
  id,
  modalClassName,
  modalContentClassName,
  modalShown,
  modalHidden,
  open = false,
  position,
  role = 'dialog',
  size,
  styling,
  toggleModal,
  tabIndex,
  withCloseButton,
  ...rest
}) => {
  console.log(styling)
  const [isOpen, setOpenStatus] = useState(open || false)
  const modalContent = useRef(null)

  useEffect(() => {
    setOpenStatus(open)
  }, [open])

  const handleOnEntered = (type, node) => {
    node.classList.add('show')

    if (type === 'modal') {
      modalShown && modalShown()
    }
  }

  const handleOnExit = (type, node) => {
    node.classList.remove('show')
  }

  const handleOnExited = () => {
    modalHidden && modalHidden()
  }

  const handleBackdropClick = e => {
    if (!modalContent.current.contains(e.target) && closeOnBackdropClick) {
      toggleModal()
    }
  }

  if (!isOpen) {
    return false
  }

  const backdropClasses = classNames(styling['modal-backdrop'], 'fade', backdropClassName)

  const modalClasses = classNames(styling.modal, 'fade', modalClassName)

  const modalAttrs = {
    'aria-hidden': true,
    id: id || undefined,
    tabIndex,
    role,
    style: {
      display: 'block'
    }
  }

  const modalDialogClasses = classNames(
    styling['modal-dialog'],
    className,
    size && styling[`modal-${size}`],
    centered && styling['modal-dialog-centered'],
    position && styling[`modal-${position}`]
  )

  const contentClasses = classNames(styling['modal-content'], modalContentClassName)

  return (
    <>
      {backdrop && (
        <Transition
          timeout={150}
          in={isOpen}
          appear={isOpen}
          mountOnEnter
          unmountOnExit
          onEntered={node => handleOnEntered('backdrop', node)}
          onExit={node => handleOnExit('backdrop', node)}
          onExited={handleOnExited}>
          <div className={backdropClasses} />
        </Transition>
      )}
      <Transition
        timeout={150}
        in={isOpen}
        appear={isOpen}
        mountOnEnter
        unmountOnExit
        onClick={handleBackdropClick}
        onEntered={node => handleOnEntered('modal', node)}
        onExit={node => handleOnExit('modal', node)}>
        <div className={modalClasses} {...modalAttrs}>
          <div className={modalDialogClasses} role='document'>
            <div ref={modalContent} className={contentClasses}>
              {children}
            </div>
          </div>
        </div>
      </Transition>
    </>
  )
}

Modal.propTypes = {
  /**
   *
   */
  animation: PropTypes.bool,
  /**
   * Whether it should display a backdrop, or not. Defaults to true.
   */
  backdrop: PropTypes.bool,
  /**
   * The class name for the backdrop element.
   */
  backdropClassName: PropTypes.string,
  /**
   * The children nodes.
   */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  /**
   * Whether it should be centered, or not.
   */
  centered: PropTypes.bool,
  /**
   * The class name.
   */
  className: PropTypes.string,
  /**
   * Whether or not clicking the backdrop closes the modal. Defaults to true.
   */
  closeOnBackdropClick: PropTypes.bool,
  /**
   * Optional header content to display at the top of the modal, sectioned out separately
   */
  header: PropTypes.any,
  /**
   * Optional footer content to display at the the bottom of the modal, sectioned out separately
   */
  footer: PropTypes.any,
  /**
   * The unique id of the component
   */
  id: PropTypes.string,
  /**
   * The function that should be triggered when the modal is shown.
   */
  modalShown: PropTypes.func,
  /**
   * The function that should be triggered when the modal is finally hidden.
   */
  modalHidden: PropTypes.func,
  /**
   * The class name for the modal.
   */
  modalClassName: PropTypes.string,
  /**
   * The class name for the modal content.
   */
  modalContentClassName: PropTypes.string,
  /**
   * Whether it is open, or not. Defaults to false
   */
  open: PropTypes.bool,
  /**
   * The role attribute for the modal. Defaults to 'dialog'
   */
  role: PropTypes.string,
  /**
   * The size. 'sm' or 'lg' (otherwise defaults to normal 'md')
   */
  size: PropTypes.string,
  /**
   * The tab index.
   */
  tabIndex: PropTypes.string,
  /**
   * The toggle function.
   */
  toggleModal: PropTypes.func,
  /**
   * Whether or not a "X" icon is included in the top right to allow the user to exit the dialog
   */
  withCloseButton: PropTypes.bool
}

export default ThemeWrapper(themeName => `modal/modal_${themeName}.module.scss`)(Modal)
