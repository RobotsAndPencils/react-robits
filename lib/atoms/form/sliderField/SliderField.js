import React from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../../ThemeWrapper'
import defaultStyles from './sliderField.module.scss'
import ReactBootstrapSlider from 'react-bootstrap-slider'
import 'bootstrap-slider/src/sass/bootstrap-slider.scss'

function onSlideStop (e) {
  this.onChange(e.target.value)
}

const SliderField = ({
  styling,
  input,
  id,
  minLabel,
  maxLabel,
  label,
  minValue,
  maxValue,
  initialValue,
  meta: { touched, error },
  instanceContainerClass,
  disabled,
  readonly,
  ...rest
}) => {
  let val = (input.value) ? input.value : initialValue

  return (
    <div className={`${instanceContainerClass} ${styling['slider']} ${disabled ? styling['disabled'] : ''} ${readonly ? styling['readonly'] : ''}`}>
      {
        label
          ? <label className={styling['field-label']}>
            {label}
          </label>
          : []
      }
      <ReactBootstrapSlider
        id={id}
        value={val}
        slideStop={onSlideStop.bind(input)}
        tooltip='hide'
        disabled={(disabled || readonly) ? 'disabled' : undefined}
        max={maxValue}
        min={minValue}
        {...rest} />
      {
        readonly
          ? <input type='hidden' readOnly={readonly} {...input} {...rest} />
          : []
      }
      <div className={styling['min-max-labels-container']}>
        <div className={styling['min-label']}>{minLabel}</div>
        <div className={styling['max-label']}>{maxLabel}</div>
      </div>
      {touched && error ? <span className={styling['field-error']}>{error}</span> : []}
    </div>
  )
}

SliderField.propTypes = {
  meta: PropTypes.object,
  input: PropTypes.object,
  label: PropTypes.any,
  step: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  minLabel: PropTypes.string,
  maxLabel: PropTypes.string,
  id: PropTypes.string,
  initialValue: PropTypes.number,
  instanceContainerClass: PropTypes.string,
  readonly: PropTypes.bool,
  styling: PropTypes.object,
  disabled: PropTypes.bool
}

SliderField.defaultProps = {
  minValue: 0,
  maxValue: 100,
  initialValue: 50,
  instanceContainerClass: ''
}

export default ThemeWrapper({defaultStyles})(SliderField)
