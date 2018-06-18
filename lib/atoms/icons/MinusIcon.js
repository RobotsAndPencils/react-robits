import React from 'react'
import PropTypes from 'prop-types'
import colors from '../../../styles/_0colors.scss'

const MinusIcon = ({width, fillColor, isFilled, ...props}) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} viewBox='0 0 24 24' {...props}>
      {
        isFilled
          ? <path fill={fillColor} d='M15.25,12.75 L8.75,12.75 C8.34,12.75 8,12.41 8,12 C8,11.59 8.34,11.25 8.75,11.25 L15.25,11.25 C15.66,11.25 16,11.59 16,12 C16,12.41 15.66,12.75 15.25,12.75 M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2' />
          : <path fill={fillColor} d='M12,2 C17.523,2 22,6.478 22,12 C22,17.522 17.523,22 12,22 C6.477,22 2,17.522 2,12 C2,6.478 6.477,2 12,2 M12,3.5 C7.313,3.5 3.5,7.313 3.5,12 C3.5,16.687 7.313,20.5 12,20.5 C16.687,20.5 20.5,16.687 20.5,12 C20.5,7.313 16.687,3.5 12,3.5 M15.25,12.75 L8.75,12.75 C8.336,12.75 8,12.414 8,12 C8,11.586 8.336,11.25 8.75,11.25 L15.25,11.25 C15.664,11.25 16,11.586 16,12 C16,12.414 15.664,12.75 15.25,12.75' />
      }
    </svg>
  )
}

MinusIcon.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  fillColor: PropTypes.string,
  isFilled: PropTypes.bool
}

MinusIcon.defaultProps = {
  width: 15,
  fillColor: colors.x_brand,
  isFilled: false
}

export default MinusIcon
