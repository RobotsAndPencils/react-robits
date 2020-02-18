import React from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import * as themes from './themes'
import classNames from 'classnames'

/**
 * The `FormCheckbox` component is a wrapper over Bootstrap's [custom checkbox component](https://getbootstrap.com/docs/4.1/components/forms/#checkboxes-and-radios-1).
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
  onChange = () => {},
  ...props
}) => {
  const containerClasses = classNames(
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
        <label htmlFor={id} aria-hidden='true' onClick={onChange} />
        <span className={styling['form-checkbox-description']}>{children}</span>
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
   * The onChange handler.
   */
  onChange: PropTypes.func,
  /**
   * The inner ref.
   */
  innerRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.string
  ])
}

export default ThemeWrapper(themes)(FormCheckbox)
