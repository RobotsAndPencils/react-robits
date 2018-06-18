import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'

const sampleValidate = (values) => {
  const errors = {}
  if (!values.text_input) {
    errors.text_input = 'Normal Input is required'
  }
  if (!values.places_input) {
    errors.places_input = 'Places Input is required'
  }
  if (!values.hint_input) {
    errors.hint_input = 'Normal Input with hint is required'
  }
  if (!values.masked_input) {
    errors.masked_input = 'Masked Input is required'
  }
  if (!values.select_input) {
    errors.select_input = 'Required'
  }
  if (!values.area_input) {
    errors.area_input = 'Text Area is required'
  }
  if (!values.date_input) {
    errors.date_input = 'Date Input is required'
  }
  if (!values.password_input) {
    errors.password_input = 'With tooltip is required'
  }
  if (!values.radios_input) {
    errors.radios_input = 'Single Select Tab is required'
  }
  if (!values.checkbox_input) {
    errors.checkbox_input = 'Required'
  }
  if (!values.file_upload) {
    errors.file_upload = 'Upload your file is required'
  }
  if (!values.drop_zone) {
    errors.drop_zone = 'Upload your file is required'
  }
  if (!values.type_ahead) {
    errors.type_ahead = 'Helpful Field is required'
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
