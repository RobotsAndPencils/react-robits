import React from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../../ThemeWrapper'
import defaultStyles from './selectField.module.scss'

const SelectField = ({
  styling,
  children,
  input,
  label,
  meta: { touched, error, autofilled, pristine, initial },
  instanceContainerClass,
  disabled,
  readonly,
  hintContent,
  ...rest
}) => {
  return (
    <div className={`${instanceContainerClass} ${disabled ? styling['disabled'] : ''} ${readonly ? styling['readonly'] : ''}`}>
      {
        label
          ? <label className={styling['field-label']}>
            <span>{label}</span>
          </label>
          : []
      }
      <div className={styling['field-container']}>
        <select
          {...input}
          {...rest}
          disabled={disabled || readonly}
          readOnly={readonly}
          className={`${styling['select-field']} ${touched && error ? 'invalid' : ''} ${!autofilled && pristine && !initial ? 'initialized' : ''}`}>
          {children}
        </select>
        {
          readonly
            ? <input type='hidden' readOnly={readonly} {...input} {...rest} />
            : []
        }
        {
          (hintContent)
            ? <div className={styling['field-hint']}>{hintContent}</div>
            : []
        }
      </div>
    </div>
  )
}

SelectField.defaultProps = {
  instanceContainerClass: ''
}

SelectField.propTypes = {
  meta: PropTypes.object,
  input: PropTypes.object,
  label: PropTypes.any,
  children: PropTypes.node,
  instanceContainerClass: PropTypes.string,
  styling: PropTypes.object,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  hintContent: PropTypes.string
}

export default ThemeWrapper({defaultStyles})(SelectField)
