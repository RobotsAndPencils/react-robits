import React from 'react'
import PropTypes from 'prop-types'
import colors from '../../../styles/_0colors.scss'

const PersonSquareIcon = ({width, fillColor, isFilled, ...props}) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} viewBox='0 0 24 24' {...props}>
      {
        isFilled
          ? <path fill={fillColor} d='M17,17.25 C17,17.66 16.66,18 16.25,18 L7.75,18 C7.34,18 7,17.66 7,17.25 L7,17 C7,15.62 8.12,14.5 9.5,14.5 L14.5,14.5 C15.88,14.5 17,15.62 17,17 L17,17.25 Z M12,7.5 C13.38,7.5 14.5,8.62 14.5,10 C14.5,11.37 13.38,12.5 12,12.5 C10.62,12.5 9.5,11.37 9.5,10 C9.5,8.62 10.62,7.5 12,7.5 Z M18,3 L6,3 C4.34,3 3,4.34 3,6 L3,18 C3,19.66 4.34,21 6,21 L18,21 C19.66,21 21,19.66 21,18 L21,6 C21,4.34 19.66,3 18,3 Z' />
          : <path fill={fillColor} d='M17,17.25 L17,17 C17,15.346 15.654,14 14,14 L10,14 C8.346,14 7,15.346 7,17 L7,17.25 C7,17.664 7.336,18 7.75,18 C8.164,18 8.5,17.664 8.5,17.25 L8.5,17 C8.5,16.173 9.173,15.5 10,15.5 L14,15.5 C14.827,15.5 15.5,16.173 15.5,17 L15.5,17.25 C15.5,17.664 15.836,18 16.25,18 C16.664,18 17,17.664 17,17.25 M12,8 C11.173,8 10.5,8.673 10.5,9.5 C10.5,10.327 11.173,11 12,11 C12.827,11 13.5,10.327 13.5,9.5 C13.5,8.673 12.827,8 12,8 M12,12.5 C10.346,12.5 9,11.154 9,9.5 C9,7.846 10.346,6.5 12,6.5 C13.654,6.5 15,7.846 15,9.5 C15,11.154 13.654,12.5 12,12.5 M18,3 L6,3 C4.343,3 3,4.343 3,6 L3,18 C3,19.657 4.343,21 6,21 L18,21 C19.657,21 21,19.657 21,18 L21,6 C21,4.343 19.657,3 18,3 M18,4.5 C18.827,4.5 19.5,5.173 19.5,6 L19.5,18 C19.5,18.827 18.827,19.5 18,19.5 L6,19.5 C5.173,19.5 4.5,18.827 4.5,18 L4.5,6 C4.5,5.173 5.173,4.5 6,4.5 L18,4.5' />
      }
    </svg>

  )
}

PersonSquareIcon.defaultProps = {
  fillColor: colors.x_light_gray_10,
  width: 34,
  isFilled: false
}
PersonSquareIcon.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  fillColor: PropTypes.string,
  isFilled: PropTypes.bool
}

export default PersonSquareIcon
