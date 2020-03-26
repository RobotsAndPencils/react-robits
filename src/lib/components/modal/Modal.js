import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import * as themes from './themes'
import classNames from 'classnames'
import { Transition } from 'react-transition-group'

/**
 * A dialog overlay
 */
export const Modal = ({
  styling,
  children,
  open = false,
  id,
  backdrop = true,
  tabIndex,
  backdropClassName,
  modalClassName,
  animation,
  modalContentClassName,
  position,
  role = 'dialog',
  size,
  centered,
  className,
  modalShown,
  toggleModal,
  modalHidden,
  header,
  footer,
  withCloseButton,
  closeOnBackdropClick = true,
  ...rest
}) => {
  const [isOpen, setOpenStatus] = useState(open || false)
  const modalContent = useRef(null)

  useEffect(() => {
    setOpenStatus(open)
  }, [open])

  const handleOnEntered = (type, node) => {
    node.classList.add(styling.show)

    if (type === 'modal') {
      modalShown && modalShown()
    }
  }

  const handleOnExit = (type, node) => {
    node.classList.remove(styling.show)
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

  const backdropClasses = classNames(styling['modal-backdrop'], styling.fade, backdropClassName)

  const modalClasses = classNames(styling.modal, styling.fade, modalClassName)

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
   * The id.
   */
  id: PropTypes.string,
  /**
   * The class name.
   */
  className: PropTypes.string,
  /**
   * Whether it is open, or not.
   */
  open: PropTypes.bool,
  /**
   * Whether it should display a backdrop, or not.
   */
  backdrop: PropTypes.bool,
  /**
   * The function that should be triggered when the modal is shown.
   */
  modalShown: PropTypes.func,
  /**
   * The function that should be triggered when the modal is finally hidden.
   */
  modalHidden: PropTypes.func,
  /**
   * Whether it should be centered, or not.
   */
  centered: PropTypes.bool,
  /**
   * The class name for the backdrop element.
   */
  backdropClassName: PropTypes.string,
  /**
   * The toggle function.
   */
  toggleModal: PropTypes.func,
  /**
   * The class name for the modal.
   */
  modalClassName: PropTypes.string,
  /**
   *
   */
  animation: PropTypes.bool,
  /**
   * The size. 'sm' or 'lg' (otherwise defaults to normal 'md')
   */
  size: PropTypes.string,
  /**
   * The tab index.
   */
  tabIndex: PropTypes.string,
  /**
   * The class name for the modal content.
   */
  modalContentClassName: PropTypes.string,
  /**
   * The role attribute for the modal.
   */
  role: PropTypes.string,
  /**
   * The children nodes.
   */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default ThemeWrapper(themes)(Modal)
