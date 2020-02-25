import React from 'react'
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
  const containerClasses = classNames(
    styling['form-control-container'],
    inline && styling['inline'],
    props.disabled && styling['disabled']
  )

  const labelClasses = classNames(
    styling['form-checkbox'],
    toggle && styling['as-toggle'],
    small && styling['smaller'],
    valid && styling['is-valid'],
    invalid && styling['is-invalid']
  )

  const inputClasses = classNames(
    valid && styling['is-valid'],
    invalid && styling['is-invalid']
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
        <label htmlFor={id} aria-hidden='true'/>
        <span className={styling['description']}>{children}</span>
      </label>
      <div className={styling['form-control-descenders']}>
        {invalid && errorText ? <div className={styling['form-control-error']}>{errorText}</div> : []}
        {required && !invalid ? <div className={styling['form-control-required']}>Required</div> : []}
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
  innerRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.string
  ]),
  /**
   * The input ID
   */
  id: PropTypes.string.isRequired,
  /**
   * Text to display if the field is invalid.
   */
  errorText : PropTypes.string,
  /**
   * Whether the field is required or not
   */
  required: PropTypes.bool
}

export default ThemeWrapper(themes)(FormCheckbox)
