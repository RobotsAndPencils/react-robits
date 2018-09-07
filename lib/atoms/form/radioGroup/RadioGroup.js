import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {uniqueId} from 'lodash'
import defaultStyles from './radioGroup.module.scss'
import ThemeWrapper from '../../../ThemeWrapper'

class RadioGroup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: ''
    }
  }

  componentWillMount () {
    const {selected, input, meta: { dirty }} = this.props
    if (!dirty && selected) {
      input.onChange(selected)
      this._setActive(selected)
    }
  }

  componentWillReceiveProps ({selected, input, meta: { dirty }}) {
    if (!dirty && selected) {
      input.onChange(selected)
      this._setActive(selected)
    }
    if (!dirty && !selected) {
      this._setActive('')
    }
    // allow for reset / nullify
    if (dirty) {
      this._setActive(input.value)
    }
  }

  _setActive = (name) => {
    this.setState({selected: name})
  }

  _renderInputButtons = () => {
    const {buttons, input, styling} = this.props
    const radioBtns = buttons.map((btn) => {
      let btnTxt, btnVal, btnDescription
      if (typeof btn === 'string') {
        btnTxt = btn
        btnVal = btn
      } else if (typeof btn === 'object') {
        btnTxt = btn.text
        btnVal = btn.value
      }
      const id = uniqueId('inputButton_')
      const selected = (this.state.selected === btnVal)
      let style = styling['radio-field']
      if (selected) {
        style += ` ${styling['selected']}`
      }
      const clickAction = () => {
        input.onChange(btnVal)
        this._setActive(btnVal)
      }
      let disabled = (this.props.disabled || (this.props.readonly && !selected))
      return (
        <div onClick={disabled ? undefined : clickAction} key={id} className={style}>
          <input type='radio' name={input.name} id={id} autoComplete='off' value={btnVal} checked={selected} disabled={disabled} />
          <div className={styling['text']}>{btnTxt}</div>
        </div>
      )
    })
    return radioBtns
  }

  render () {
    const {
      styling,
      label,
      disabled,
      isStacked,
      instanceContainerClass,
      readonly,
      meta: { touched, error }
    } = this.props

    return (
      <div className={`${instanceContainerClass} ${styling['radioGroup-container']} ${disabled ? styling['disabled'] : ''} ${readonly ? styling['readonly'] : ''}`}>
        {
          label
            ? <label className={styling['field-label']}>
              {label}
            </label>
            : []
        }
        <div className={`${styling['field-container']} ${isStacked ? '' : styling['side-by-side']} ${touched && error ? styling['invalid'] : ''}`}>
          {this._renderInputButtons()}
        </div>
        {touched && error ? <span className={styling['field-error']}>{error}</span> : []}
      </div>
    )
  }
}

RadioGroup.propTypes = {
  meta: PropTypes.object,
  input: PropTypes.object,
  selected: PropTypes.string,
  label: PropTypes.any,
  buttons: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.object)
  ]),
  instanceContainerClass: PropTypes.string,
  styling: PropTypes.object,
  isStacked: PropTypes.bool,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool
}

RadioGroup.defaultProps = {
  isStacked: true,
  instanceContainerClass: ''
}

export default ThemeWrapper({defaultStyles})(RadioGroup)
