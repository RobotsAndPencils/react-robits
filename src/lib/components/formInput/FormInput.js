import React from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import classNames from 'classnames'

/**
 * The form input allows you to create various text style inputs such as `text`, `password`, `email`, `number`, `url`, `search` and more.
 */
export const FormInput = ({
  className,
  children,
  disabled = false,
  errorText,
  hintContent,
  invalid = false,
  innerRef,
  label,
  readonly = false,
  required,
  size,
  styling,
  valid = false,
  ...rest
}) => {
  const inputClasses = classNames(
    'form-control',
    size && `form-control-${size}`,
    valid && 'is-valid',
    invalid && 'is-invalid',
    disabled && 'disabled'
  )

  const containerClasses = classNames(className, disabled && 'disabled', 'form-control-container')

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
        'input-group',
        leaders.length + trailers.length > 0 && 'input-group-seamless',
        size && `input-group-${size}`
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
        {...rest}
        ref={innerRef}
        disabled={disabled}
        readOnly={readonly}
        className={inputClasses}
      />
    )
  }

  return (
    <div className={containerClasses}>
      {label ? (
        <label htmlFor={rest.id} className={`${size ? `form-control-label-${size}` : ''}`}>
          {label}
          {required && '*'}
        </label>
      ) : (
        []
      )}
      {hintContent && label ? <div className='form-control-hint'>{hintContent}</div> : []}
      {renderInputRow()}
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

FormInput.propTypes = {
  /**
   * The class name.
   */
  className: PropTypes.string,
  /**
   * The children nodes.
   */
  children: PropTypes.node,
  /**
   * Whether or not the component is disabled
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
   * Whether the field is required or not
   */
  required: PropTypes.bool,
  /**
   * Whether or not the field is readonly
   */
  readonly: PropTypes.bool,
  /**
   * The input's size.
   */
  size: PropTypes.string,
  /**
   * Whether it is valid, or not.
   */
  valid: PropTypes.bool
}

export default ThemeWrapper(themeName => `formInput/formInput_${themeName}.module.scss`)(FormInput)
