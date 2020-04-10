import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import classNames from 'classnames'
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead'

/**
 * The autocomplete input allows you to type with automatic suggestions, select from those suggestions, add multiple tokenized values
 */
export const FormAutocomplete = ({
  allowNew = false,
  className,
  children,
  disabled = false,
  errorText,
  forceMatch = false,
  hintContent,
  invalid = false,
  innerRef,
  label,
  labelKey = 'label',
  multiple = false,
  onSearch = undefined,
  options = [],
  onChange = () => {},
  required,
  size,
  styling,
  valid = false,
  ...rest
}) => {
  const Tag = onSearch ? AsyncTypeahead : Typeahead
  const componentRef = useRef(null)

  const onBlur = async e => {
    const instance = componentRef.current.getInstance()

    // figure out if the extra text should be cleared due to a mis-match when forceMatch is configured
    if (forceMatch || (multiple && allowNew)) {
      let shouldClear = false
      if (instance.props.multiple) {
        if (instance.state.text && instance.state.text.length > 0) {
          shouldClear = true
        }
      } else if (forceMatch) {
        // not multiple but force matched
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
        onChange={onChange}
        emptyLabel='Nothing to suggest'
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
   * Whether or not the user can enter a new token. Defaults to false
   */
  allowNew: PropTypes.bool,
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
   * Whether or not the component should force a match from the suggestions, clearing anything unmatched. Defaults to false
   */
  forceMatch: PropTypes.bool,
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
   * The key in the data object to use for display. Can be a callback function, allowing you to transform your data and return a compound string rather than just a single data field.
   */
  labelKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * Whether or not the component accepts multiple distinct inputs
   */
  multiple: PropTypes.bool,
  /**
   * Callback function to use for async dataset updates based on user input
   */
  onSearch: PropTypes.func,
  /**
   * Data set to use for suggestions
   */
  options: PropTypes.array,
  /**
   * The function to call after a change has been made to the selection(s)
   */
  onChange: PropTypes.func,
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
  valid: PropTypes.bool
}

export default ThemeWrapper(
  themeName => `formAutocomplete/formAutocomplete_${themeName}.module.scss`
)(FormAutocomplete)
