import React from 'react'
import PropTypes from 'prop-types'
import colors from '../../../styles/_0colors.scss'

const ExclamationIcon = ({width, fillColor, isFilled, ...props}) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} viewBox='0 0 24 24' {...props}>
      {
        isFilled
          ? <path fill={fillColor} d='M12,17 C11.45,17 11,16.55 11,16 C11,15.45 11.45,15 12,15 C12.55,15 13,15.45 13,16 C13,16.55 12.55,17 12,17 Z M11.25,7.5 C11.25,7.09 11.59,6.75 12,6.75 C12.41,6.75 12.75,7.09 12.75,7.5 L12.75,12.5 C12.75,12.91 12.41,13.25 12,13.25 C11.59,13.25 11.25,12.91 11.25,12.5 L11.25,7.5 Z M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z' />
          : <path fill={fillColor} d='M12,2 C17.523,2 22,6.477 22,12 C22,17.523 17.523,22 12,22 C6.477,22 2,17.523 2,12 C2,6.477 6.477,2 12,2 M12,3.5 C7.313,3.5 3.5,7.313 3.5,12 C3.5,16.687 7.313,20.5 12,20.5 C16.687,20.5 20.5,16.687 20.5,12 C20.5,7.313 16.687,3.5 12,3.5 M12.75,12.5 L12.75,7.5 C12.75,7.086 12.414,6.75 12,6.75 C11.586,6.75 11.25,7.086 11.25,7.5 L11.25,12.5 C11.25,12.914 11.586,13.25 12,13.25 C12.414,13.25 12.75,12.914 12.75,12.5 M12,15 C12.552,15 13,15.448 13,16 C13,16.552 12.552,17 12,17 C11.448,17 11,16.552 11,16 C11,15.448 11.448,15 12,15' />
      }
    </svg>
  )
}

ExclamationIcon.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  fillColor: PropTypes.string,
  isFilled: PropTypes.bool
}

ExclamationIcon.defaultProps = {
  width: 14,
  fillColor: colors.x_alert,
  isFilled: false
}

export default ExclamationIcon
