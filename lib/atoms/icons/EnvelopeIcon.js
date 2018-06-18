import React from 'react'
import PropTypes from 'prop-types'
import colors from '../../../styles/_0colors.scss'

const EnvelopeIcon = ({width, fillColor, isFilled, ...props}) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} viewBox='0 0 24 24' {...props}>
      {
        isFilled
          ? <path fill={fillColor} d='M12.4004,13.3799 C12.2804,13.4599 12.1394,13.4999 12.0004,13.4999 C11.8604,13.4999 11.7194,13.4599 11.5994,13.3799 L2.0004,7.2399 L2.0004,16.9999 C2.0004,18.6599 3.3394,19.9999 5.0004,19.9999 L19.0004,19.9999 C20.6604,19.9999 22.0004,18.6599 22.0004,16.9999 L22.0004,7.2399 L12.4004,13.3799 Z M21.6904,5.6699 L12.0004,11.8599 L2.3094,5.6699 C2.7994,4.6799 3.8204,3.9999 5.0004,3.9999 L19.0004,3.9999 C20.1794,3.9999 21.2004,4.6799 21.6904,5.6699 Z' />
          : <path fill={fillColor} d='M20.5,17 C20.5,17.83 19.83,18.5 19,18.5 L5,18.5 C4.17,18.5 3.5,17.83 3.5,17 L3.5,8.2 L11.6,13.38 C11.72,13.46 11.86,13.5 12,13.5 C12.14,13.5 12.28,13.46 12.4,13.38 L20.5,8.2 L20.5,17 Z M5,5.5 L19,5.5 C19.65,5.5 20.2,5.91 20.4,6.49 L12,11.86 L3.6,6.49 C3.8,5.91 4.35,5.5 5,5.5 Z M21.69,5.67 C21.2,4.68 20.18,4 19,4 L5,4 C3.82,4 2.8,4.68 2.31,5.67 C2.11,6.07 2,6.52 2,7 L2,17 C2,18.66 3.34,20 5,20 L19,20 C20.66,20 22,18.66 22,17 L22,7 C22,6.52 21.89,6.07 21.69,5.67 Z' />
      }
    </svg>
  )
}

EnvelopeIcon.defaultProps = {
  fillColor: colors.x_white,
  width: 17,
  isFilled: false
}
EnvelopeIcon.propTypes = {
  fillColor: PropTypes.string,
  isFilled: PropTypes.bool,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

export default EnvelopeIcon
