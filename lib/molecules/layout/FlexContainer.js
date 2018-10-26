/********************************************************************************
 This is a style wrapper that creates a fully maximized flex container.
 ********************************************************************************/

import React from 'react'
import PropTypes from 'prop-types'
import styles from './flexContainer.module.scss'

const FlexContainer = ({children, horizontalOnly, verticalOnly}) => {
  return (
    <div className={`${styles['flex-container']} ${horizontalOnly ? 'horizontal-only' : ''} ${verticalOnly ? 'vertical-only' : ''}`}>
      {children}
    </div>
  )
}

FlexContainer.defaultProps = {
  horizontalOnly: false,
  verticalOnly: false
}

FlexContainer.propTypes = {
  children: PropTypes.any.isRequired,
  horizontalOnly: PropTypes.bool,
  verticalOnly: PropTypes.bool
}

export default FlexContainer
