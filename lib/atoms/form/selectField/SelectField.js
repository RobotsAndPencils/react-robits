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
  hintContent,
  ...rest
}) => {
  return (
    <div className={`${instanceContainerClass} ${disabled ? styling['disabled'] : ''}`}>
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
          disabled={disabled}
          className={`${styling['select-field']} ${touched && error ? 'invalid' : ''} ${!autofilled && pristine && !initial ? 'initialized' : ''}`}>
          {children}
        </select>
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
  label: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  styling: PropTypes.object,
  disabled: PropTypes.bool,
  hintContent: PropTypes.string
}

export default ThemeWrapper({defaultStyles})(SelectField)
