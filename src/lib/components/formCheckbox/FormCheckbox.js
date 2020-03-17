import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import * as themes from './themes'
import classNames from 'classnames'

/**
 * The `FormCheckbox` component allows for a on/off selection in either a checkbox or toggle display
 */
export const FormCheckbox = ({
  styling,
  className,
  children,
  inline,
  valid,
  invalid,
  innerRef,
  toggle,
  small,
  id,
  errorText,
  required,
  ...props
}) => {
  useEffect(() => {
    styling.use()
    return () => {
      styling.unuse()
    }
  }, [styling])

  const containerClasses = classNames(
    'form-control-container',
    inline && 'inline',
    props.disabled && 'disabled'
  )

  const labelClasses = classNames(
    styling.locals['form-checkbox'],
    toggle && styling.locals['as-toggle'],
    small && styling.locals.smaller,
    valid && styling.locals['is-valid'],
    invalid && styling.locals['is-invalid']
  )

  const inputClasses = classNames(
    valid && styling.locals['is-valid'],
    invalid && styling.locals['is-invalid']
  )

  return (
    <div className={containerClasses}>
      <label className={labelClasses}>
        <input
          {...props}
          ref={innerRef}
          id={id}
          type='checkbox'
          required='required'
          className={inputClasses}
        />
        <label htmlFor={id} aria-hidden='true' />
        <span className={styling.locals.description}>{children}</span>
      </label>
      <div className='form-control-descenders'>
        {invalid && errorText ? <div className='form-control-error'>{errorText}</div> : []}
        {required && !invalid ? <div className='form-control-required'>Required</div> : []}
      </div>
    </div>
  )
}

FormCheckbox.propTypes = {
  /**
   * The class name.
   */
  className: PropTypes.string,
  /**
   * The children nodes.
   */
  children: PropTypes.node,
  /**
   * Whether it is inline, or not.
   */
  inline: PropTypes.bool,
  /**
   * Whether it is valid, or not.
   */
  valid: PropTypes.bool,
  /**
   * Whether it is invalid, or not.
   */
  invalid: PropTypes.bool,
  /**
   * Whether it is a toggle button, or not.
   */
  toggle: PropTypes.bool,
  /**
   * Whether it is small (toggle), or not.
   */
  small: PropTypes.bool,
  /**
   * The inner ref.
   */
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  /**
   * The input ID
   */
  id: PropTypes.string.isRequired,
  /**
   * Text to display if the field is invalid.
   */
  errorText: PropTypes.string,
  /**
   * Whether the field is required or not
   */
  required: PropTypes.bool
}

export default ThemeWrapper(themes)(FormCheckbox)
