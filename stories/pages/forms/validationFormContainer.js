import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'

const sampleValidate = (values, props) => {
  const errors = {}
  if (!values.text_input) {
    errors.text_input = 'Required'
  }
  if (!values.masked_input) {
    errors.masked_input = 'Required'
  }
  if (!values.select_input) {
    errors.select_input = 'Required'
  }
  if (!values.textarea_input) {
    errors.textarea_input = 'Required'
  }
  if (!values.radios_input) {
    errors.radios_input = 'Required'
  }
  if (!values.checkbox_input) {
    errors.checkbox_input = 'Required'
  }
  if (!values.file_upload) {
    errors.file_upload = 'Required'
  }
  if (!values.slider_input) {
    errors.slider_input = 'Required'
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
  // validate: sampleValidate
})(ValidationFormContainer)
