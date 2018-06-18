import React from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../../ThemeWrapper'
import defaultStyles from './sliderField.module.scss'
import ReactBootstrapSlider from 'react-bootstrap-slider'
import 'bootstrap-slider/src/sass/bootstrap-slider.scss'
import _ from 'lodash'

function onSlideStop (e) {
  this.onChange(e.target.value)
}

const SliderField = ({
  styling,
  input,
  minLabel,
  maxLabel,
  label,
  minValue,
  maxValue,
  initialValue,
  meta: { touched, error },
  instanceContainerClass,
  disabled,
  ...rest
}) => {
  let val = (input.value) ? input.value : initialValue

  return (
    <div className={`${instanceContainerClass} ${disabled ? styling['disabled'] : ''}`}>
      {
        label
          ? <label className={styling['field-label']}>
            {label}
          </label>
          : []
      }
      <ReactBootstrapSlider
        id={input.id}
        value={val}
        slideStop={onSlideStop.bind(input)}
        tooltip='hide'
        max={maxValue}
        min={minValue}
        {...rest} />
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
  label: PropTypes.string,
  step: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  minLabel: PropTypes.string,
  maxLabel: PropTypes.string,
  initialValue: PropTypes.number,
  instanceContainerClass: PropTypes.string,
  readonly: PropTypes.bool,
  styling: PropTypes.object,
  disabled: PropTypes.bool
}

SliderField.defaultProps = {
  minValue: 0,
  maxValue: 100,
  initialValue: 50
}

export default ThemeWrapper({defaultStyles})(SliderField)

