import React from 'react'
import PropTypes from 'prop-types'
import colors from '../../../styles/_0colors.scss'

const SearchIcon = ({width, fillColor, isFilled, ...props}) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} viewBox='0 0 24 24' {...props}>
      {
        isFilled
          ? <path fill={fillColor} d='M9,14 C6.24,14 4,11.76 4,9 C4,6.24 6.24,4 9,4 C11.76,4 14,6.24 14,9 C14,11.76 11.76,14 9,14 M20.71,19.29 L14.6,13.18 C15.49,12.01 16,10.57 16,9 C16,5.13 12.87,2 9,2 C5.13,2 2,5.13 2,9 C2,12.87 5.13,16 9,16 C10.57,16 12.01,15.49 13.18,14.6 L19.29,20.71 C19.49,20.9 19.74,21 20,21 C20.26,21 20.51,20.9 20.71,20.71 C21.1,20.32 21.1,19.68 20.71,19.29' />
          : <path fill={fillColor} d='M3.5,9 C3.5,5.97 5.97,3.5 9,3.5 C12.03,3.5 14.5,5.97 14.5,9 C14.5,12.03 12.03,14.5 9,14.5 C5.97,14.5 3.5,12.03 3.5,9 M20.78,19.72 L14.45,13.39 C15.42,12.19 16,10.67 16,9 C16,5.13 12.87,2 9,2 C5.13,2 2,5.13 2,9 C2,12.87 5.13,16 9,16 C10.67,16 12.19,15.42 13.39,14.45 L19.72,20.78 C19.87,20.93 20.06,21 20.25,21 C20.44,21 20.63,20.93 20.78,20.78 C21.07,20.49 21.07,20.01 20.78,19.72' />
      }
    </svg>
  )
}

SearchIcon.defaultProps = {
  fillColor: colors.x_light_gray_10,
  width: 15,
  isFilled: false
}
SearchIcon.propTypes = {
  fillColor: PropTypes.string,
  isFilled: PropTypes.bool,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

export default SearchIcon
