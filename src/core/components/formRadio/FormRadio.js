import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import classNames from 'classnames'
import ButtonGroup from '../buttonGroup/ButtonGroup'
import Button from '../button/Button'

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
    defaultSelected,
    setFieldValue = () => {},
    asButtonGroup = false,
    pill,
    squared,
    size,
    ...rest
  }) => {
    const [selected, setSelected] = useState(defaultSelected || null)

    const containerClasses = classNames(
      'form-control-container',
      styling['radios-container'],
      inline && styling.inline,
      asButtonGroup && styling['as-button-group'],
      rest.disabled && styling.disabled
    )

    const inputClasses = classNames(valid && styling['is-valid'], invalid && styling['is-invalid'])

    const handleChange = (e, value) => {
      if (e.target.checked && setFieldValue) {
        setFieldValue(name, value)
      }
      setSelected(value)
    }

    const renderRadio = ({ id, isSelected, value, onChangeHandler }) => {
      return (
        <input
          id={id}
          type='radio'
          name={name}
          value={value}
          required='required'
          className={inputClasses}
          checked={isSelected}
          disabled={rest.disabled}
          onChange={onChangeHandler}
        />
      )
    }

    const renderOptions = () => {
      return options.map(({ label, value }, idx) => {
        const isSelected = selected === value
        const id = `${name}_${idx}`
        const labelClasses = classNames(
          styling['form-radio'],
          valid && styling['is-valid'],
          invalid && styling['is-invalid'],
          isSelected && styling['is-selected']
        )
        if (asButtonGroup) {
          return (
            <>
              {renderRadio({ id, isSelected, value })}
              <Button
                onClick={e => handleChange(e, value)}
                styleType={isSelected ? 'primary' : 'light'}
                outline={!isSelected}
                pill={pill}
                squared={squared}
                size={size}
                themeName={rest.themeName}>
                {label}
              </Button>
            </>
          )
        } else {
          return (
            <label key={id} className={labelClasses}>
              {renderRadio({ id, isSelected, value, onChangeHandler: e => handleChange(e, value) })}
              <label htmlFor={id} className={styling['custom-control-label']} aria-hidden='true' />
              <span className={styling.description}>{label}</span>
            </label>
          )
        }
      })
    }

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
          {asButtonGroup ? (
            <ButtonGroup vertical={!inline} themeName={rest.themeName}>
              {renderOptions()}
            </ButtonGroup>
          ) : (
            renderOptions()
          )}
        </div>
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
   * Whether it is valid, or not.
   */
  valid: PropTypes.bool,
  /**
   * Function that takes the name of the form field and the value as parameters for bubbling up the change
   */
  setFieldValue: PropTypes.func,
  /**
   * Whether or not to visually display the radio's as a button group
   */
  asButtonGroup: PropTypes.bool,
  /**
   * Whether or not to square corners when displayed as a button group
   */
  squared: PropTypes.bool,
  /**
   * Whether or not to pill corners when displayed as a button group
   */
  pill: PropTypes.bool,
  /**
   * Button size when displayed as a button group
   */
  size: PropTypes.string
}

export default ThemeWrapper(themeName => `formRadio/formRadio_${themeName}.module.scss`)(FormRadio)
