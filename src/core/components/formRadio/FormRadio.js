import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import classNames from 'classnames'

/**
 * The `FormRadio` component is a group of radio buttons under a common form name
 */
export const FormRadio = React.memo(
  ({
    className,
    errorText,
    hintContent,
    inline,
    invalid,
    label,
    name,
    options,
    required,
    styling,
    valid,
    ...rest
  }) => {
    const [selected, setSelected] = useState()

    const containerClasses = classNames(
      'form-control-container',
      styling['radios-container'],
      inline && styling.inline,
      rest.disabled && styling.disabled
    )

    const labelClasses = classNames(
      styling['form-radio'],
      valid && styling['is-valid'],
      invalid && styling['is-invalid']
    )

    const inputClasses = classNames(valid && styling['is-valid'], invalid && styling['is-invalid'])

    return (
      <div className={containerClasses} {...rest}>
        {label ? (
          <label>
            {label}
            {required && '*'}
          </label>
        ) : (
          []
        )}
        {hintContent && label ? <div className='form-control-hint'>{hintContent}</div> : []}
        <div className={styling['form-radio-group']}>
          {options.map(({ label, value }, idx) => {
            const id = `${name}_${idx}`
            return (
              <label key={id} className={labelClasses}>
                <input
                  id={id}
                  type='radio'
                  required='required'
                  className={inputClasses}
                  checked={selected === value}
                  disabled={rest.disabled}
                  onChange={() => setSelected(value)}
                />
                <label
                  htmlFor={id}
                  className={styling['custom-control-label']}
                  aria-hidden='true'
                />
                <span className={styling.description}>{label}</span>
              </label>
            )
          })}
        </div>
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
)

FormRadio.propTypes = {
  /**
   * The class name.
   */
  className: PropTypes.string,
  /**
   * The error to display below the input
   */
  errorText: PropTypes.string,
  /**
   * Text to display below the input as clues to the user
   */
  hintContent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /**
   * Whether it is inline, or not.
   */
  inline: PropTypes.bool,
  /**
   * Whether it is invalid, or not.
   */
  invalid: PropTypes.bool,
  /**
   * Radio group label
   */
  label: PropTypes.string,
  /**
   * The form input name
   */
  name: PropTypes.string.isRequired,
  /**
   * The array of option config objects. This prop should be memoized for performance
   */
  options: PropTypes.array.isRequired,
  /**
   * Whether or not the input is requires within a form
   */
  required: PropTypes.bool,
  /**
   * Whether it is a toggle button, or not.
   */
  toggle: PropTypes.bool,
  /**
   * Whether it is valid, or not.
   */
  valid: PropTypes.bool
}

export default ThemeWrapper(themeName => `formRadio/formRadio_${themeName}.module.scss`)(FormRadio)
