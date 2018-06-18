import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import Tooltip from 'react-bootstrap/lib/Tooltip'
import _ from 'lodash'
import QuestionMarkIcon from '../../icons/QuestionMarkIcon'
import ExclamationIcon from '../../icons/ExclamationIcon'
import UploadIcon from '../../icons/UploadIcon'
import styles from './fileField.module.scss'

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
    const { input, type, label, tooltipContent, meta: { touched, error }, className = null } = this.props

    const fileFieldID = _.uniqueId('fileField_')

    let hasTooltip
    if (tooltipContent) {
      const tooltip = (
        <Tooltip className={styles['lyra-tooltip']} id={_.uniqueId('inputTooltip_')}>{tooltipContent}</Tooltip>
      )
      const iconWithTooltip = (
        <OverlayTrigger placement='top' overlay={tooltip} delayHide={1000}>
          <span className={styles['tooltip-icon-container']}><QuestionMarkIcon isFilled /></span>
        </OverlayTrigger>
      )
      hasTooltip = iconWithTooltip
    }

    return (
      <div className={className}>
        <div styleName='field-label-container'>
          <div styleName='field-label'>
            {touched && error ? <span styleName='validation'>{error}{hasTooltip}</span> : <span>{label}{hasTooltip}</span>}
          </div>
        </div>
        <div styleName='file-field'>
          <label htmlFor={fileFieldID} styleName={touched && error ? 'invalid-file' : ''}>
            <UploadIcon fillColor='currentColor' />
            Choose File
          </label>
          <div styleName='uploaded-file'>{this.state.fileName}</div>
          <input
            id={fileFieldID}
            {...input}
            type={type}
            value=''
            onChange={this.onChange} />
        </div>
      </div>
    )
  }
}

FileField.propTypes = {
  type: PropTypes.string,
  meta: PropTypes.object,
  input: PropTypes.object,
  label: PropTypes.string,
  tooltipContent: PropTypes.node,
  className: PropTypes.string
}

export default CSSModules(FileField, styles, {allowMultiple: true})
