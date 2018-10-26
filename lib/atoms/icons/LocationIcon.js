import React from 'react'
import PropTypes from 'prop-types'
import colors from '../../../styles/_0colors.scss'

const LocationIcon = ({width, fillColor, isFilled, ...props}) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} viewBox='0 0 24 24' {...props}>
      {
        isFilled
          ? <path fill={fillColor} d='M12,14 C9.52,14 7.5,11.98 7.5,9.5 C7.5,7.02 9.52,5 12,5 C14.48,5 16.5,7.02 16.5,9.5 C16.5,11.98 14.48,14 12,14 M12,1 C7.04,1 3,5.04 3,10 C3,16.46 11.16,23.52 11.51,23.82 C11.65,23.94 11.83,24 12,24 C12.17,24 12.35,23.94 12.49,23.82 C12.84,23.52 21,16.46 21,10 C21,5.04 16.96,1 12,1' />
          : <path fill={fillColor} d='M12,2.5 C7.864,2.5 4.5,5.864 4.5,10 C4.5,14.924 10.264,20.633 12,22.24 C13.736,20.633 19.5,14.924 19.5,10 C19.5,5.864 16.136,2.5 12,2.5 M12,24 C11.826,24 11.653,23.939 11.512,23.82 C11.165,23.521 3,16.459 3,10 C3,5.037 7.038,1 12,1 C16.962,1 21,5.037 21,10 C21,16.459 12.835,23.521 12.488,23.82 C12.347,23.939 12.174,24 12,24 M12,6.5 C10.346,6.5 9,7.846 9,9.5 C9,11.154 10.346,12.5 12,12.5 C13.654,12.5 15,11.154 15,9.5 C15,7.846 13.654,6.5 12,6.5 M12,14 C9.519,14 7.5,11.981 7.5,9.5 C7.5,7.019 9.519,5 12,5 C14.481,5 16.5,7.019 16.5,9.5 C16.5,11.981 14.481,14 12,14' />
      }
    </svg>
  )
}

LocationIcon.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  fillColor: PropTypes.string,
  isFilled: PropTypes.bool
}

LocationIcon.defaultProps = {
  width: 23,
  fillColor: colors.x_brand,
  isFilled: false
}

export default LocationIcon
