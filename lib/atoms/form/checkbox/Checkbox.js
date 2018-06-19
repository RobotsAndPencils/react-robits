import React from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../../ThemeWrapper'
import defaultStyles from './checkbox.module.scss'

const Checkbox = ({
  styling,
  children,
  disabled,
  input,
  meta: { touched, error },
  clickableLabel,
  instanceContainerClass,
  readonly,
  ...rest
}) => {
  let idText = null

  if (clickableLabel) {
    idText = input.name
  }

  return (
    <div className={`${styling['checkbox-container']} ${instanceContainerClass} ${disabled ? styling['disabled'] : ''} ${readonly ? styling['readonly'] : ''}`}>
      <div className={styling['field-container']}>
        <input
          {...input}
          {...rest}
          id={input.name}
          type='checkbox'
          checked={input.value}
          disabled={readonly || disabled}
          className={`${styling['checkbox-field']} ${touched && error ? styling['invalid'] : ''}`} />
        {
          readonly
            ? <input type='hidden' readOnly={readonly} {...input} {...rest} />
            : []
        }
      </div>
      <label htmlFor={idText} className={styling['field-label']}>
        {children}
      </label>
    </div>
  )
}

Checkbox.defaultProps = {
  clickableLabel: true,
  instanceContainerClass: ''
}

Checkbox.propTypes = {
  meta: PropTypes.object,
  input: PropTypes.object,
  children: PropTypes.node,
  clickableLabel: PropTypes.bool,
  instanceContainerClass: PropTypes.string,
  styling: PropTypes.object,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool
}

export default ThemeWrapper({defaultStyles})(Checkbox)
