import React from 'react'
import PropTypes from 'prop-types'
import colors from '../../../styles/_0colors.scss'

const CopyIcon = ({width, fillColor, isFilled, ...props}) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} viewBox='0 0 24 24' {...props}>
      {
        isFilled
          ? <path fill={fillColor} d='M22,8 L22,20 C22,21.66 20.66,23 19,23 L10,23 C8.34,23 7,21.66 7,20 L7,8 C7,6.34 8.34,5 10,5 L19,5 C20.66,5 22,6.34 22,8 M17.95,3.5 L10,3.5 C7.52,3.5 5.5,5.52 5.5,8 L5.5,18.95 C4.08,18.72 3,17.49 3,16 L3,4 C3,2.34 4.34,1 6,1 L15,1 C16.49,1 17.72,2.08 17.95,3.5' />
          : <path fill={fillColor} d='M20.5,20 C20.5,20.83 19.83,21.5 19,21.5 L10,21.5 C9.17,21.5 8.5,20.83 8.5,20 L8.5,8 C8.5,7.17 9.17,6.5 10,6.5 L19,6.5 C19.83,6.5 20.5,7.17 20.5,8 L20.5,20 Z M6,17.5 C5.17,17.5 4.5,16.83 4.5,16 L4.5,4 C4.5,3.17 5.17,2.5 6,2.5 L15,2.5 C15.83,2.5 16.5,3.17 16.5,4 L16.5,5 L10,5 C8.34,5 7,6.34 7,8 L7,17.5 L6,17.5 Z M19,5 L18,5 L18,4 C18,2.34 16.66,1 15,1 L6,1 C4.34,1 3,2.34 3,4 L3,16 C3,17.66 4.34,19 6,19 L7,19 L7,20 C7,21.66 8.34,23 10,23 L19,23 C20.66,23 22,21.66 22,20 L22,8 C22,6.34 20.66,5 19,5 Z' />
      }
    </svg>

  )
}

CopyIcon.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  fillColor: PropTypes.string,
  isFilled: PropTypes.bool
}

CopyIcon.defaultProps = {
  width: '36',
  fillColor: colors.x_primary_action,
  isFilled: false
}

export default CopyIcon
