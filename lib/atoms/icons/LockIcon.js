import React from 'react'
import PropTypes from 'prop-types'
import colors from '../../../styles/_0colors.scss'

const LockIcon = ({width, fillColor, isFilled, ...props}) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} viewBox='0 0 24 24' {...props}>
      {
        isFilled
          ? <path fill={fillColor} d='M15,7 L9,7 L9,4.5 C9,2.85 10.35,1.5 12,1.5 C13.65,1.5 15,2.85 15,4.5 L15,7 Z M12.75,15.29 L12.75,17.25 C12.75,17.66 12.41,18 12,18 C11.59,18 11.25,17.66 11.25,17.25 L11.25,15.29 C10.8,15.04 10.5,14.55 10.5,14 C10.5,13.17 11.17,12.5 12,12.5 C12.83,12.5 13.5,13.17 13.5,14 C13.5,14.55 13.2,15.04 12.75,15.29 Z M17,7 L16.5,7 L16.5,4.5 C16.5,2.02 14.48,0 12,0 C9.52,0 7.5,2.02 7.5,4.5 L7.5,7 L7,7 C5.34,7 4,8.34 4,10 L4,20 C4,21.66 5.34,23 7,23 L17,23 C18.66,23 20,21.66 20,20 L20,10 C20,8.34 18.66,7 17,7 Z' />
          : <path fill={fillColor} d='M13.5,14 C13.5,14.55 13.2,15.04 12.75,15.29 L12.75,17.25 C12.75,17.66 12.41,18 12,18 C11.59,18 11.25,17.66 11.25,17.25 L11.25,15.29 C10.8,15.04 10.5,14.55 10.5,14 C10.5,13.17 11.17,12.5 12,12.5 C12.83,12.5 13.5,13.17 13.5,14 Z M18.5,20 C18.5,20.83 17.83,21.5 17,21.5 L7,21.5 C6.17,21.5 5.5,20.83 5.5,20 L5.5,10 C5.5,9.17 6.17,8.5 7,8.5 L17,8.5 C17.83,8.5 18.5,9.17 18.5,10 L18.5,20 Z M9,4.5 C9,2.85 10.35,1.5 12,1.5 C13.65,1.5 15,2.85 15,4.5 L15,7 L9,7 L9,4.5 Z M17,7 L16.5,7 L16.5,4.5 C16.5,2.02 14.48,0 12,0 C9.52,0 7.5,2.02 7.5,4.5 L7.5,7 L7,7 C5.34,7 4,8.34 4,10 L4,20 C4,21.66 5.34,23 7,23 L17,23 C18.66,23 20,21.66 20,20 L20,10 C20,8.34 18.66,7 17,7 Z' />
      }
    </svg>
  )
}

LockIcon.defaultProps = {
  fillColor: colors.x_light_gray_100,
  width: 15,
  isFilled: false
}
LockIcon.propTypes = {
  fillColor: PropTypes.string,
  isFilled: PropTypes.bool,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

export default LockIcon
