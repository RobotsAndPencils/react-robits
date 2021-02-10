import React from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import classNames from 'classnames'

/**
 * The select component allows the user to pick one item from a preset collection of options
 */
export const FormSelect = React.memo(
  ({
    children,
    className,
    disabled = false,
    errorText,
    hintContent,
    invalid = false,
    innerRef,
    isLabelInset = false,
    label,
    readonly = false,
    required,
    size,
    styling,
    valid = false,
    ...props
  }) => {
    const makeDisabled = disabled || readonly // readonly is not supported for select, so use disabled
    const selectClasses = classNames(
      'form-control',
      styling['form-select'],
      size && styling[`form-select-${size}`],
      valid && 'is-valid',
      invalid && 'is-invalid',
      disabled && 'disabled'
    )

    const fieldsetClasses = classNames(
      'form-control',
      styling.fieldset,
      valid && 'is-valid',
      invalid && 'is-invalid',
      disabled && 'disabled'
    )

    const containerClasses = classNames(className, disabled && 'disabled', 'form-control-container')

    const renderSelect = () => {
      return (
        <select
          {...props}
          ref={innerRef}
          disabled={makeDisabled}
          readOnly={readonly}
          className={selectClasses}>
          {children}
        </select>
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
            {renderSelect()}
          </fieldset>
        ) : (
          renderSelect()
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

FormSelect.propTypes = {
  /**
   * The class name.
   */
  className: PropTypes.string,
  /**
   * The options of the control, as children nodes.
   */
  children: PropTypes.node.isRequired,
  /**
   * Whether or not the input is disabled. Defaults to false
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

export default ThemeWrapper(themeName => `formSelect/formSelect_${themeName}.module.scss`)(
  FormSelect
)
