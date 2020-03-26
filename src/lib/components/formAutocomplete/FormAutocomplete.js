import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import * as themes from './themes'
import classNames from 'classnames'
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead'

import { INPUT_TYPES } from '../../constants/constants'

/**
 * The form input allows you to type with automatic suggestions, select from those suggestions, add multiple tokenized values
 */
export const FormAutocomplete = ({
  required,
  styling,
  className,
  label,
  size,
  invalid = false,
  valid = false,
  innerRef,
  disabled = false,
  errorText,
  hintContent,
  children,
  multiple = false,
  forceMatch = false,
  allowNew = false,
  onSearch = undefined,
  options = [],
  labelKey = 'label',
  onChange = () => {},
  ...rest
}) => {
  const Tag = onSearch ? AsyncTypeahead : Typeahead
  const componentRef = useRef(null)

  const onBlur = async e => {
    const instance = componentRef.current.getInstance()

    // figure out if the extra text should be cleared due to a mis-match when forceMatch is configured
    if (forceMatch) {
      let shouldClear = false
      if (instance.props.multiple) {
        if (instance.state.text && instance.state.text.length > 0) {
          shouldClear = true
        }
      } else {
        let hasMatch = false
        if (instance.state.text.length > 0 && instance.state.selected.length > 0) {
          const selectionByLabelKey =
            typeof instance.props.labelKey === 'function'
              ? instance.props.labelKey(instance.state.selected[0])
              : instance.state.selected[0][instance.props.labelKey]
          hasMatch = selectionByLabelKey === instance.state.text
        }
        shouldClear = instance.state.selected.length === 0 || !hasMatch
      }

      if (!instance.state.isFocused && shouldClear) {
        if (instance.props.multiple && instance.state.selected.length > 0) {
          // must clear and re-select in order to reset the mismatched text and plugin state
          const resetValues = instance.state.selected
          await instance.clear()
          instance._handleSelectionAdd(resetValues)
        } else {
          instance.clear()
        }

        // bubble up any change
        onChange(instance.state.selected)
      }
    }

    if (!instance.state.isFocused && rest.onBlur) {
      rest.onBlur(instance.state.selected) // resume normal onBlur if present
    }
  }

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
      <Tag
        {...rest}
        disabled={disabled}
        bsSize={size}
        isValid={valid}
        isInvalid={invalid}
        inputProps={{
          ref: innerRef
        }}
        multiple={multiple}
        allowNew={multiple && allowNew}
        forceMatch={forceMatch}
        onSearch={onSearch}
        options={options}
        labelKey={labelKey}
        ref={componentRef}
        onBlur={onBlur}
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

FormAutocomplete.propTypes = {
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

export default ThemeWrapper(themes)(FormAutocomplete)
