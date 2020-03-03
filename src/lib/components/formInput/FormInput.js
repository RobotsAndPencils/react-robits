import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import * as themes from './themes'
import classNames from 'classnames'

import { INPUT_TYPES } from '../../constants/constants'

/**
 * The form input allows you to create various text style inputs such as `text`, `password`, `email`, `number`, `url`, `search` and more.
 */
export const FormInput = ({
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
  children,
  ...props
}) => {
  useEffect(() => {
    styling.use()
    return () => {
      styling.unuse()
    }
  }, [styling])

  const inputClasses = classNames(
    'form-control',
    size && `form-control-${size}`,
    valid && 'is-valid',
    invalid && 'is-invalid',
    disabled && 'disabled'
  )

  const containerClasses = classNames(
    className,
    disabled && 'disabled',
    'form-control-container'
  )

  const renderInputRow = () => {
    if (children) {
      const prependers = []
      const leaders = []
      const trailers = []
      const appenders = []

      React.Children.forEach(children, element => {
        if (!React.isValidElement(element)) return

        switch (element.props.type) {
          case 'prepend':
            prependers.push(element)
            break
          case 'leading':
            leaders.push(element)
            break
          case 'trailing':
            trailers.push(element)
            break
          case 'append':
            appenders.push(element)
            break
          default:
        }
      })

      const inputGroupClasses = classNames(
        styling.locals['input-group'],
        (leaders.length + trailers.length > 0) && styling.locals['input-group-seamless'],
        size && styling.locals[`input-group-${size}`]
      )

      return (
        <div className={inputGroupClasses}>
          {prependers}
          {leaders}
          {renderInput()}
          {trailers}
          {appenders}
        </div>
      )
    } else {
      return renderInput()
    }
  }

  const renderInput = () => {
    return (
      <input
        {...props}
        ref={innerRef}
        disabled={disabled}
        readOnly={readonly}
        className={inputClasses} />
    )
  }

  return (
    <div className={containerClasses}>
      {
        label
          ? (
            <label htmlFor={props.id} className={`${size ? `form-control-label-${size}` : ''}`}>
              {label}{required && '*'}
            </label>
          )
          : []
      }
      {hintContent && label ? <div className='form-control-hint'>{hintContent}</div> : []}
      {renderInputRow()}
      <div className='form-control-descenders'>
        <div>
          {invalid && errorText ? <div className='form-control-error'>{errorText}</div> : []}
          {hintContent && !label ? <div className='form-control-hint'>{hintContent}</div> : []}
        </div>
        {required && !label && !invalid ? <div className='form-control-required'>Required</div> : []}
      </div>
    </div>
  )
}

FormInput.propTypes = {
  /**
   * The class name.
   */
  className: PropTypes.string,
  /**
   * The input type.
   */
  type: PropTypes.oneOf(INPUT_TYPES),
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
  innerRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.string
  ]),
  /**
   * Text to display if the field is invalid.
   */
  errorText: PropTypes.string,
  /**
   * Text to display below the input as clues to the user
   */
  hintContent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]),
  /**
   * Whether the field is required or not
   */
  required: PropTypes.bool
}

export default ThemeWrapper(themes)(FormInput)
