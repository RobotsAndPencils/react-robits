import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'

const sampleValidate = (values) => {
  const errors = {}
  if (!values.text_input) {
    errors.text_input = 'Requireds'
  }
  if (!values.masked_input) {
    errors.masked_input = 'Requireds'
  }
  if (!values.select_input) {
    errors.select_input = 'Requireds'
  }
  if (!values.textarea_input) {
    errors.textarea_input = 'Requireds'
  }
  if (!values.radios_input) {
    errors.radios_input = 'Requireds'
  }
  if (!values.checkbox_input) {
    errors.checkbox_input = 'Requireds'
  }
  if (!values.file_upload) {
    errors.file_upload = 'Requireds'
  }
  if (!values.slider_input) {
    errors.slider_input = 'Requireds'
  }
  return errors
}

let ValidationFormContainer = props => {
  const { handleSubmit, children } = props
  return (
    <form onSubmit={handleSubmit}>
      {children}
    </form>
  )
}

ValidationFormContainer.propTypes = {
  children: PropTypes.element,
  handleSubmit: PropTypes.func
}

export default reduxForm({
  form: 'ValidationFormContainer', // a unique identifier for this form
  validate: sampleValidate
})(ValidationFormContainer)
