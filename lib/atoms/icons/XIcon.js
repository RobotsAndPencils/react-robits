import React from 'react'
import PropTypes from 'prop-types'
import colors from '../../../styles/_0colors.scss'

const XIcon = ({width, fillColor, isFilled, ...props}) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} viewBox='0 0 24 24' {...props}>
      {
        isFilled
          ? <path fill={fillColor} d='M20.71,19.29 C21.1,19.68 21.1,20.32 20.71,20.71 C20.51,20.9 20.26,21 20,21 C19.74,21 19.49,20.9 19.29,20.71 L12,13.42 L4.71,20.71 C4.51,20.9 4.26,21 4,21 C3.74,21 3.49,20.9 3.29,20.71 C2.9,20.32 2.9,19.68 3.29,19.29 L10.58,12 L3.29,4.71 C2.9,4.32 2.9,3.68 3.29,3.29 C3.68,2.9 4.32,2.9 4.71,3.29 L12,10.58 L19.29,3.29 C19.68,2.9 20.32,2.9 20.71,3.29 C21.1,3.68 21.1,4.32 20.71,4.71 L13.42,12 L20.71,19.29 Z' />
          : <path fill={fillColor} d='M20.7803,19.7197 C21.0703,20.0097 21.0703,20.4907 20.7803,20.7807 C20.6303,20.9297 20.4403,20.9997 20.2503,20.9997 C20.0593,20.9997 19.8703,20.9297 19.7193,20.7807 L12.0003,13.0597 L4.2803,20.7807 C4.1303,20.9297 3.9403,20.9997 3.7503,20.9997 C3.5593,20.9997 3.3703,20.9297 3.2193,20.7807 C2.9293,20.4907 2.9293,20.0097 3.2193,19.7197 L10.9403,11.9997 L3.2193,4.2807 C2.9293,3.9907 2.9293,3.5097 3.2193,3.2197 C3.5093,2.9297 3.9903,2.9297 4.2803,3.2197 L12.0003,10.9407 L19.7193,3.2197 C20.0093,2.9297 20.4903,2.9297 20.7803,3.2197 C21.0703,3.5097 21.0703,3.9907 20.7803,4.2807 L13.0593,11.9997 L20.7803,19.7197 Z' />
      }
    </svg>
  )
}

XIcon.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  fillColor: PropTypes.string,
  isFilled: PropTypes.bool
}

XIcon.defaultProps = {
  width: 16,
  fillColor: colors.x_light_gray_10,
  isFilled: false
}

export default XIcon
