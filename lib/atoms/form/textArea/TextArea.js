import React from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../../ThemeWrapper'
import defaultStyles from './textArea.module.scss'

const TextArea = ({
  styling,
  input,
  label,
  placeholder,
  disabled,
  instanceContainerClass,
  rows,
  meta: { touched, error },
  hintContent,
  readonly,
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
        <textarea
          {...input}
          {...rest}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          readOnly={readonly}
          className={`${styling['textarea-field']} ${touched && error ? styling['invalid'] : ''} ${readonly ? styling['readonly'] : ''}`}>
        </textarea>
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

TextArea.propTypes = {
  placeholder: PropTypes.string,
  meta: PropTypes.object,
  input: PropTypes.object,
  label: PropTypes.any,
  tooltipContent: PropTypes.node,
  rows: PropTypes.number,
  className: PropTypes.string
}

TextArea.defaultProps = {
  rows: 3
}

export default ThemeWrapper({defaultStyles})(TextArea)
