import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import * as themes from './themes'
import classNames from 'classnames'

import Fade from '../Fade'
import { TIMEOUT } from '../../constants/constants'

/**
 * The alert component can be used to display contextual user messages.
 */

export const Alert = ({
  className,
  styling,
  closeClassName,
  closeAriaLabel = 'Close',
  tag: Tag = 'div',
  styleType = 'primary',
  open = false,
  dismissible,
  autoDismissDelay,
  removeHandler,
  children,
  transition = {
    ...Fade.defaultProps,
    unmountOnExit: true
  },
  fade = true,
  centered = true,
  id,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(open)

  useEffect(() => {
    if (autoDismissDelay && open) {
      if (open && !isOpen) {
        setIsOpen(true)
      }
      setTimeout(() => {
        setIsOpen(false)
        setTimeout(() => {
          removeHandler(id)
        }, TIMEOUT.FADE + 100)
      }, autoDismissDelay)
    }
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
          onClick={() => dismissible(id)}>
          <span aria-hidden='true'>&times;</span>
        </button>
      ) : null}
      {children}
    </Fade>
  )
}

Alert.propTypes = {
  /**
   * The children nodes.
   */
  children: PropTypes.node,
  /**
   * The class name.
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
   * Whether is open, or not.
   */
  open: PropTypes.bool,
  /**
   * Whether is dismissible, or not.
   */
  dismissible: PropTypes.func,
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
  id: PropTypes.string.isRequired
}

export default ThemeWrapper(themes)(Alert)
