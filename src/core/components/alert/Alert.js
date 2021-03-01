import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import classNames from 'classnames'

import Fade from '../../utils/Fade'
import { TIMEOUT } from '../../constants/constants'

/**
 * The alert component can be used to display contextual user messages.
 */

export const Alert = ({
  autoDismissDelay,
  centered = true,
  children,
  className,
  closeClassName,
  closeAriaLabel = 'Close',
  dismissible,
  fade = true,
  id,
  open = false,
  removeHandler,
  styling,
  styleType = 'primary',
  tag: Tag = 'div',
  transition = {
    ...Fade.defaultProps,
    unmountOnExit: true
  },
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(open)

  const dismiss = () => {
    setIsOpen(false)
    setTimeout(() => {
      removeHandler(id)
    }, TIMEOUT.FADE + 100)
  }

  // the below helps to solve a memory leak at the project level
  // but breaks within Storybook :(
  // const dismissTimeout = useRef(null)
  // useEffect(() => {
  //   return () => {
  //     if (dismissTimeout.current !== null) {
  //       clearTimeout(dismissTimeout.current)
  //     }
  //   }
  // })
  // ...
  // dismissTimeout.current = setTimeout(() => {
  //   dismiss()
  //   dismissTimeout.current = null
  // }, autoDismissDelay)

  useEffect(() => {
    if (autoDismissDelay && open) {
      if (open && !isOpen) {
        setIsOpen(true)
      }
      setTimeout(() => {
        dismiss()
      }, autoDismissDelay)
    } else {
      setIsOpen(open)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoDismissDelay, open, removeHandler, id])

  const classes = classNames(
    className,
    styling.alert,
    styling[`alert-${styleType}`],
    centered && styling.centered,
    dismissible && styling['alert-dismissible']
  )

  const closeClasses = classNames(styling.close, closeClassName)

  const alertTransition = {
    ...Fade.defaultProps,
    ...transition,
    baseClass: fade ? transition.baseClass : '',
    timeout: fade ? transition.timeout : 0
  }

  return (
    <Fade {...rest} {...alertTransition} tag={Tag} className={classes} in={isOpen} role='alert'>
      {dismissible ? (
        <button
          type='button'
          className={closeClasses}
          aria-label={closeAriaLabel}
          onClick={dismiss}>
          <span aria-hidden='true'>&times;</span>
        </button>
      ) : null}
      {children}
    </Fade>
  )
}

Alert.propTypes = {
  /**
   * Time in milliseconds the alert should appear for before auto-dismissing itself
   */
  autoDismissDelay: PropTypes.number,
  /**
   * Whether to center align the alert's contents
   */
  centered: PropTypes.bool,
  /**
   * The children nodes.
   */
  children: PropTypes.node,
  /**
   * Custom class name.
   */
  className: PropTypes.string,
  /**
   * The close button's class name.
   */
  closeClassName: PropTypes.string,
  /**
   * The close button's aria label.
   */
  closeAriaLabel: PropTypes.string,
  /**
   * The style color.
   */
  styleType: PropTypes.string,
  /**
   * Whether it should fade, or not.
   */
  fade: PropTypes.bool,
  /**
   * Whether it is open, or not.
   */
  open: PropTypes.bool,
  /**
   * Whether the user can dismiss it, or not.
   */
  dismissible: PropTypes.bool,
  /**
   * The function to run after it is dismissed, for cleanup
   */
  removeHandler: PropTypes.func,
  /**
   * The transition config. See `Fade` component for more details.
   */
  transition: PropTypes.shape(Fade.propTypes),
  /**
   * The component tag type.
   */
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /**
   * A unique ID for the alert
   */
  id: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string.isRequired])
}

export default ThemeWrapper(themeName => `alert/alert_${themeName}.module.scss`)(Alert)
