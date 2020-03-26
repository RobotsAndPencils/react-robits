import React from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import * as themes from './themes'

const ModalFooter = ({ children, styling }) => {
  return <div className={styling['modal-footer']}>{children}</div>
}

ModalFooter.propTypes = {
  children: PropTypes.any
}

export default ThemeWrapper(themes)(ModalFooter)
