import React from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import classNames from 'classnames'

/**
 * The textarea lets the user input multiple sentences of data (a text blob)
 */
export const FormTextarea = React.memo(
  ({
    className,
    disabled = false,
    errorText,
    hintContent,
    invalid = false,
    innerRef,
    isLabelInset = false,
    label,
    readonly = false,
    resizeable = true,
    required,
    size,
    styling,
    valid = false,
    ...props
  }) => {
    const textareaClasses = classNames(
      'form-control',
      size && `form-control-${size}`,
      valid && 'is-valid',
      invalid && 'is-invalid',
      disabled && 'disabled',
      !resizeable && 'noresize'
    )

    const containerClasses = classNames(className, disabled && 'disabled', 'form-control-container')

    const fieldsetClasses = classNames(
      'form-control',
      styling.fieldset,
      props.cols && styling['has-cols'],
      valid && 'is-valid',
      invalid && 'is-invalid',
      disabled && 'disabled'
    )

    const renderTextarea = () => {
      return (
        <textarea
          {...props}
          ref={innerRef}
          disabled={disabled}
          readOnly={readonly}
          className={textareaClasses}
        />
      )
    }

    return (
      <div className={containerClasses}>
        {label && !isLabelInset && (
          <label htmlFor={props.id} className={`${size ? `form-control-label-${size}` : ''}`}>
            {label}
            {required && '*'}
          </label>
        )}
        {hintContent && label ? <div className='form-control-hint'>{hintContent}</div> : []}
        {isLabelInset ? (
          <fieldset className={fieldsetClasses} tabIndex={-1}>
            <legend>
              {label}
              {required && '*'}
            </legend>
            {renderTextarea()}
          </fieldset>
        ) : (
          renderTextarea()
        )}
        <div className='form-control-descenders'>
          <div>
            {invalid && errorText ? <div className='form-control-error'>{errorText}</div> : []}
            {hintContent && !label ? <div className='form-control-hint'>{hintContent}</div> : []}
          </div>
          {required && !label && !invalid && <div className='form-control-required'>Required</div>}
        </div>
      </div>
    )
  }
)

FormTextarea.propTypes = {
  /**
   * The class name.
   */
  className: PropTypes.string,
  /**
   * Whether or not the input is disabled or not
   */
  disabled: PropTypes.bool,
  /**
   * Text to display if the field is invalid.
   */
  errorText: PropTypes.string,
  /**
   * Text to display below the input as clues to the user
   */
  hintContent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /**
   * Whether it is invalid, or not.
   */
  invalid: PropTypes.bool,
  /**
   * The inner ref.
   */
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  /**
   * Optional label to display above the input
   */
  label: PropTypes.string,
  /**
   * Whether or not the input is readonly
   */
  readonly: PropTypes.bool,
  /**
   * Whether the field is required or not
   */
  required: PropTypes.bool,
  /**
   * Whether or not the user is allowed to resize the input manually
   */
  resizeable: PropTypes.bool,
  /**
   * The input's size.
   */
  size: PropTypes.string,
  /**
   * Whether it is valid, or not.
   */
  valid: PropTypes.bool,
  /**
   * If the Label should appear inside the input's border.
   */
  isLabelInset: PropTypes.bool
}

export default ThemeWrapper(themeName => `formTextarea/formTextarea_${themeName}.module.scss`)(
  FormTextarea
)
