import React from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'

const ModalFooter = ({ children, styling }) => {
  return <div className={styling['modal-footer']}>{children}</div>
}

ModalFooter.propTypes = {
  children: PropTypes.any
}

export default ThemeWrapper(themeName => `modal/modal_${themeName}.module.scss`)(ModalFooter)
