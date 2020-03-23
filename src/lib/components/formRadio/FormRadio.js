import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import * as themes from './themes'
import classNames from 'classnames'

/**
 * The `FormRadio` component is a group of radio buttons under a common form name
 */
export const FormRadio = ({
  styling,
  className,
  inline,
  valid,
  invalid,
  errorText,
  required,
  options,
  name,
  hintContent,
  label,
  ...rest
}) => {
  // useEffect(() => {
  //   styling.use()
  //   return () => {
  //     styling.unuse()
  //   }
  // }, [styling])

  const [selected, setSelected] = useState()

  const containerClasses = classNames(
    'form-control-container',
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
              <label htmlFor={id} className={styling['custom-control-label']} aria-hidden='true' />
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

FormRadio.propTypes = {
  /**
   * The class name.
   */
  className: PropTypes.string,
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
   * The form input name
   */
  name: PropTypes.string.isRequired,
  /**
   * Text to display below the input as clues to the user
   */
  hintContent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /**
   * Radio group label
   */
  label: PropTypes.string
}

export default ThemeWrapper(themes)(FormRadio)
