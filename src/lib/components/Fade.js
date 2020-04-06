import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Transition } from 'react-transition-group'
import { pick, omit } from 'lodash'

import { TIMEOUT, TRANSITION_KEYS } from '../constants/constants'

/**
 * The `Fade` component allows you to easily fade in and out content and is powered by [react-transition-group](https://github.com/reactjs/react-transition-group).
 */
const Fade = ({
  baseClass = 'fade',
  baseClassActive = 'show',
  className,
  children,
  innerRef,
  tag: Tag = 'div',
  ...rest
}) => {
  const transitionProps = pick(rest, TRANSITION_KEYS)
  const childProps = omit(rest, TRANSITION_KEYS)

  return (
    <Transition {...transitionProps}>
      {status => {
        const isActive = status === 'entered'
        const classes = classNames(className, baseClass, isActive && baseClassActive)
        return (
          <Tag className={classes} {...childProps} ref={innerRef}>
            {children}
          </Tag>
        )
      }}
    </Transition>
  )
}

Fade.propTypes = {
  ...Transition.propTypes,
  /**
   * The component's tag type. Defaults to 'div'
   */
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * The base class to apply to the component. Defaults to 'fade'
   */
  baseClass: PropTypes.string,
  /**
   * The class to apply when the componen is activited. Defaults to 'show'
   */
  baseClassActive: PropTypes.string,
  /**
   * Custom class to apply
   */
  className: PropTypes.string,
  /**
   * The inner ref.
   */
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func]),
  /**
   * The children nodes.
   */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

Fade.defaultProps = {
  ...Transition.defaultProps,
  timeout: TIMEOUT.FADE,
  appear: true,
  enter: true,
  exit: true,
  in: true
}

export default Fade
