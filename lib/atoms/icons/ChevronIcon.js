import React from 'react'
import PropTypes from 'prop-types'
import colors from '../../../styles/_0colors.scss'

const ChevronIcon = ({width, fillColor, direction, isFilled, ...props}) => {
  let rotate = 'rotate (0)'

  switch (direction) {
    case 'down':
      rotate = 'rotate(90 12 12)'
      break
    case 'left':
      rotate = 'rotate(180 12 12)'
      break
    case 'up':
      rotate = 'rotate(-90 12 12)'
      break
    default:
      rotate = 'rotate(0)'
  }

  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} viewBox='0 0 24 24' {...props}>
      {
        isFilled
          ? <path fill={fillColor} transform={rotate} d='M8,21 C7.744,21 7.488,20.902 7.293,20.707 C6.902,20.316 6.902,19.684 7.293,19.293 L14.586,12 L7.293,4.707 C6.902,4.316 6.902,3.684 7.293,3.293 C7.684,2.902 8.316,2.902 8.707,3.293 L16.707,11.293 C17.098,11.684 17.098,12.316 16.707,12.707 L8.707,20.707 C8.512,20.902 8.256,21 8,21' />
          : <path fill={fillColor} transform={rotate} d='M7.75,21 C7.559,21 7.366,20.927 7.22,20.78 C6.927,20.487 6.927,20.013 7.22,19.72 L14.939,12 L7.22,4.28 C6.927,3.987 6.927,3.513 7.22,3.22 C7.513,2.927 7.987,2.927 8.28,3.22 L16.53,11.47 C16.823,11.763 16.823,12.237 16.53,12.53 L8.28,20.78 C8.134,20.927 7.941,21 7.75,21' />
      }
    </svg>
  )
}

ChevronIcon.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  fillColor: PropTypes.string,
  direction: PropTypes.string,
  isFilled: PropTypes.bool
}

ChevronIcon.defaultProps = {
  width: 13,
  fillColor: colors.x_light_gray_10,
  direction: 'right',
  isFilled: false
}

export default ChevronIcon
