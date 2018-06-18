import React from 'react'
import PropTypes from 'prop-types'
import colors from '../../../styles/_0colors.scss'

const CalendarIcon = ({width, fillColor, isFilled, ...props}) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} viewBox='0 0 24 24' {...props}>
      {
        isFilled
          ? <path fill={fillColor} d='M21,6 L21,6.5 L3,6.5 L3,6 C3,4.34 4.34,3 6,3 L6.5,3 L6.5,1.25 C6.5,0.84 6.84,0.5 7.25,0.5 C7.66,0.5 8,0.84 8,1.25 L8,3 L16,3 L16,1.25 C16,0.84 16.34,0.5 16.75,0.5 C17.16,0.5 17.5,0.84 17.5,1.25 L17.5,3 L18,3 C19.66,3 21,4.34 21,6 Z M3,8 L21,8 L21,18 C21,19.66 19.66,21 18,21 L6,21 C4.34,21 3,19.66 3,18 L3,8 Z M15.5,13 L17.5,13 L17.5,11 L15.5,11 L15.5,13 Z M11,13 L13,13 L13,11 L11,11 L11,13 Z M11,17.5 L13,17.5 L13,15.5 L11,15.5 L11,17.5 Z M6.5,13 L8.5,13 L8.5,11 L6.5,11 L6.5,13 Z M6.5,17.5 L8.5,17.5 L8.5,15.5 L6.5,15.5 L6.5,17.5 Z' />
          : <path fill={fillColor} d='M15,13 L17,13 L17,11 L15,11 L15,13 Z M11,17 L13,17 L13,15 L11,15 L11,17 Z M7,17 L9,17 L9,15 L7,15 L7,17 Z M11,13 L13,13 L13,11 L11,11 L11,13 Z M7,13 L9,13 L9,11 L7,11 L7,13 Z M19.5,18 C19.5,18.83 18.83,19.5 18,19.5 L6,19.5 C5.17,19.5 4.5,18.83 4.5,18 L4.5,8.5 L19.5,8.5 L19.5,18 Z M4.5,6 C4.5,5.17 5.17,4.5 6,4.5 L18,4.5 C18.83,4.5 19.5,5.17 19.5,6 L19.5,7 L4.5,7 L4.5,6 Z M18,3 L17.5,3 L17.5,1.25 C17.5,0.84 17.16,0.5 16.75,0.5 C16.34,0.5 16,0.84 16,1.25 L16,3 L8,3 L8,1.25 C8,0.84 7.66,0.5 7.25,0.5 C6.84,0.5 6.5,0.84 6.5,1.25 L6.5,3 L6,3 C4.34,3 3,4.34 3,6 L3,18 C3,19.66 4.34,21 6,21 L18,21 C19.66,21 21,19.66 21,18 L21,6 C21,4.34 19.66,3 18,3 Z' />
      }
    </svg>

  )
}

CalendarIcon.defaultProps = {
  fillColor: colors.x_light_gray_10,
  width: 15,
  isFilled: false
}
CalendarIcon.propTypes = {
  fillColor: PropTypes.string,
  isFilled: PropTypes.bool,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

export default CalendarIcon
