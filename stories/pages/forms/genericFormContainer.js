import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'

let GenericFormContainer = props => {
  const { handleSubmit, children } = props
  return (
    <form onSubmit={handleSubmit}>
      {children}
    </form>
  )
}

GenericFormContainer.propTypes = {
  children: PropTypes.element,
  handleSubmit: PropTypes.func
}

export default reduxForm({
  form: 'GenericFormContainer'
})(GenericFormContainer)
