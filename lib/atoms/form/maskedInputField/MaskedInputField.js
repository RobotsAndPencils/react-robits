import React from 'react'
import PropTypes from 'prop-types'
import MaskedInput from 'react-maskedinput'
import ThemeWrapper from '../../../ThemeWrapper'
import defaultStyles from './maskedInputField.module.scss'

const MaskedInputField = ({
  styling,
  input,
  label,
  disabled,
  readonly,
  meta: { touched, error },
  mask,
  instanceContainerClass,
  hintContent,
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
      <MaskedInput
        className={`${styling['text-field']} ${touched && error ? styling['invalid'] : ''} ${readonly ? styling['readonly'] : ''}`}
        mask={mask}
        {...input}
        type='tel'
        {...rest} />
      {touched && error ? <span className={styling['field-error']}>{error}</span> : []}
      {
        (hintContent)
          ? <div className={styling['field-hint']}>{hintContent}</div>
          : []
      }
    </div>
  )
}

MaskedInputField.propTypes = {
  meta: PropTypes.object,
  input: PropTypes.object,
  label: PropTypes.any,
  mask: PropTypes.string.isRequired,
  instanceContainerClass: PropTypes.string,
  hintContent: PropTypes.string,
  readonly: PropTypes.bool,
  styling: PropTypes.object,
  disabled: PropTypes.bool
}

export default ThemeWrapper({defaultStyles})(MaskedInputField)
