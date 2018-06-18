import React from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../../ThemeWrapper'
import _ from 'lodash'
import defaultStyles from './fileField.module.scss'

class FileField extends React.Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)

    this.state = {
      fileName: ''
    }
  }

  onChange (e) {
    const { input: { onChange } } = this.props
    let fileName

    if (e.target.files && e.target.files.length > 1) {
      fileName = (e.target.getAttribute('data-multiple-caption') || '').replace('{count}', e.target.files.length)
    } else {
      fileName = e.target.value.split('\\').pop()
    }
    this.setState({
      fileName: fileName
    })

    onChange(e.target.files[0]) // bubble up to redux form
  }

  render () {
    const {
      styling,
      input,
      label,
      meta: { touched, error },
      instanceContainerClass,
      disabled,
      ...rest
    } = this.props

    const fileFieldID = _.uniqueId('fileField_')

    return (
      <div className={`${instanceContainerClass} ${disabled ? styling['disabled'] : ''}`}>
        {
          label
            ? <div>{label}</div>
            : []
        }
        <div className={styling['file-field']}>
          <label htmlFor={fileFieldID}>
            Choose File
          </label>
          <div className={styling['uploaded-file']}>{this.state.fileName}</div>
          <input
            id={fileFieldID}
            {...input}
            {...rest}
            value=''
            onChange={this.onChange} />
          {touched && error ? <span className={styling['field-error']}>{error}</span> : []}
        </div>
      </div>
    )
  }
}

FileField.defaultProps = {
  instanceContainerClass: ''
}

FileField.propTypes = {
  type: PropTypes.string,
  meta: PropTypes.object,
  input: PropTypes.object,
  label: PropTypes.any,
  instanceContainerClass: PropTypes.string,
  styling: PropTypes.object,
  disabled: PropTypes.bool
}

export default ThemeWrapper({defaultStyles})(FileField)
