import React from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../../ThemeWrapper'
import defaultStyles from './inputField.module.scss'

const InputField = ({
  styling,
  input,
  label,
  hintContent,
  meta: { touched, error },
  instanceContainerClass,
  readonly,
  disabled,
  ...rest
}) => {
  return (
    <div className={`${instanceContainerClass} ${disabled ? styling['disabled'] : ''}`}>
      {
        label
          ? <label className={styling['field-label']}>
            {label}
          </label>
          : []
      }
      <div className={styling['field-container']}>
        <input
          {...input}
          disabled={disabled}
          readOnly={readonly}
          className={`${styling['text-field']} ${touched && error ? styling['invalid'] : ''} ${readonly ? styling['readonly'] : ''}`}
          {...rest} />
        {touched && error ? <span className={styling['field-error']}>{error}</span> : []}
        {
          (hintContent)
            ? <div className={styling['field-hint']}>{hintContent}</div>
            : []
        }
      </div>
    </div>
  )
}

InputField.defaultProps = {
  instanceContainerClass: ''
}

InputField.propTypes = {
  meta: PropTypes.object,
  input: PropTypes.object,
  label: PropTypes.any,
  instanceContainerClass: PropTypes.string,
  hintContent: PropTypes.string,
  readonly: PropTypes.bool,
  styling: PropTypes.object,
  disabled: PropTypes.bool
}

export default ThemeWrapper({defaultStyles})(InputField)
