import React from 'react'
import PropTypes from 'prop-types'
import colors from '../../../styles/_0colors.scss'

const HeartIcon = ({width, fillColor, isFilled, ...props}) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} viewBox='0 0 24 24' {...props}>
      {
        isFilled
          ? <path fill={fillColor} d='M23,8.1152 C23,14.1432 14.007,20.7232 12.283,21.9092 C12.111,22.0282 11.889,22.0282 11.717,21.9092 C9.993,20.7232 1,14.1432 1,8.1152 C1,4.7332 3.469,2.0012 6.506,2.0012 C8.759,2.0012 11.002,4.0722 12,6.2182 C12.998,4.0722 15.241,2.0012 17.494,2.0012 C20.531,2.0012 23,4.7332 23,8.1152' />
          : <path fill={fillColor} d='M6.875,3.5498 C4.463,3.5498 2.5,5.7418 2.5,8.4378 C2.5,13.4448 10.131,19.0468 12,20.3428 C13.869,19.0458 21.5,13.4398 21.5,8.4378 C21.5,5.7418 19.537,3.5498 17.125,3.5498 C15.293,3.5498 13.467,5.3348 12.68,7.0128 C12.432,7.5408 11.568,7.5408 11.32,7.0128 C10.533,5.3348 8.707,3.5498 6.875,3.5498 M12,21.9998 C11.857,21.9998 11.715,21.9598 11.592,21.8788 C11.158,21.5978 1,14.9198 1,8.4378 C1,4.9158 3.636,2.0498 6.875,2.0498 C8.898,2.0498 10.816,3.5018 12,5.2058 C13.184,3.5018 15.102,2.0498 17.125,2.0498 C20.364,2.0498 23,4.9158 23,8.4378 C23,14.9198 12.842,21.5978 12.408,21.8788 C12.285,21.9598 12.143,21.9998 12,21.9998' />
      }
    </svg>
  )
}

HeartIcon.defaultProps = {
  fillColor: colors.x_alert,
  width: 24,
  isFilled: false
}
HeartIcon.propTypes = {
  fillColor: PropTypes.string,
  isFilled: PropTypes.bool,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

export default HeartIcon
