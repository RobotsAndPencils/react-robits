import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import * as themes from './themes'
import classNames from 'classnames'

/**
 * The form input allows you to create various text style inputs such as `text`, `password`, `email`, `number`, `url`, `search` and more.
 */
export const FormTextarea = ({
  required,
  styling,
  className,
  label,
  size,
  invalid = false,
  valid = false,
  innerRef,
  disabled = false,
  readonly = false,
  errorText,
  hintContent,
  resizeable = true,
  ...props
}) => {
  const textareaClasses = classNames(
    'form-control',
    size && `form-control-${size}`,
    valid && 'is-valid',
    invalid && 'is-invalid',
    disabled && 'disabled',
    !resizeable && styling.noresize
  )

  const containerClasses = classNames(
    className,
    disabled && 'disabled',
    'form-control-container',
    props.cols && styling.inline
  )

  return (
    <div className={containerClasses}>
      {label ? (
        <label htmlFor={props.id} className={`${size ? `form-control-label-${size}` : ''}`}>
          {label}
          {required && '*'}
        </label>
      ) : (
        []
      )}
      {hintContent && label ? <div className='form-control-hint'>{hintContent}</div> : []}
      <textarea
        {...props}
        ref={innerRef}
        disabled={disabled}
        readOnly={readonly}
        className={textareaClasses}
      />
      <div className='form-control-descenders'>
        <div>
          {invalid && errorText ? <div className='form-control-error'>{errorText}</div> : []}
          {hintContent && !label ? <div className='form-control-hint'>{hintContent}</div> : []}
        </div>
        {required && !label && !invalid ? (
          <div className='form-control-required'>Required</div>
        ) : (
          []
        )}
      </div>
    </div>
  )
}

FormTextarea.propTypes = {
  /**
   * The class name.
   */
  className: PropTypes.string,
  /**
   * The input's size.
   */
  size: PropTypes.string,
  /**
   * Whether it is valid, or not.
   */
  valid: PropTypes.bool,
  /**
   * Whether it is invalid, or not.
   */
  invalid: PropTypes.bool,
  /**
   * The inner ref.
   */
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  /**
   * Text to display if the field is invalid.
   */
  errorText: PropTypes.string,
  /**
   * Text to display below the input as clues to the user
   */
  hintContent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /**
   * Whether the field is required or not
   */
  required: PropTypes.bool
}

export default ThemeWrapper(themes)(FormTextarea)
