import React from 'react'
import PropTypes from 'prop-types'
import colors from '../../../styles/_0colors.scss'

const AddIcon = ({width, fillColor, isFilled, ...props}) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} viewBox='0 0 24 24' {...props}>
      {
        isFilled
          ? <path fill={fillColor} d='M15.25,12.75 L12.75,12.75 L12.75,15.25 C12.75,15.66 12.41,16 12,16 C11.59,16 11.25,15.66 11.25,15.25 L11.25,12.75 L8.75,12.75 C8.34,12.75 8,12.41 8,12 C8,11.59 8.34,11.25 8.75,11.25 L11.25,11.25 L11.25,8.75 C11.25,8.34 11.59,8 12,8 C12.41,8 12.75,8.34 12.75,8.75 L12.75,11.25 L15.25,11.25 C15.66,11.25 16,11.59 16,12 C16,12.41 15.66,12.75 15.25,12.75 M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2' />
          : <path fill={fillColor} d='M16,12 C16,12.41 15.66,12.75 15.25,12.75 L12.75,12.75 L12.75,15.25 C12.75,15.66 12.41,16 12,16 C11.59,16 11.25,15.66 11.25,15.25 L11.25,12.75 L8.75,12.75 C8.34,12.75 8,12.41 8,12 C8,11.59 8.34,11.25 8.75,11.25 L11.25,11.25 L11.25,8.75 C11.25,8.34 11.59,8 12,8 C12.41,8 12.75,8.34 12.75,8.75 L12.75,11.25 L15.25,11.25 C15.66,11.25 16,11.59 16,12 M12,20.5 C7.31,20.5 3.5,16.69 3.5,12 C3.5,7.31 7.31,3.5 12,3.5 C16.69,3.5 20.5,7.31 20.5,12 C20.5,16.69 16.69,20.5 12,20.5 M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2' />
      }
    </svg>
  )
}

AddIcon.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  fillColor: PropTypes.string,
  isFilled: PropTypes.bool
}

AddIcon.defaultProps = {
  width: 12,
  fillColor: colors.x_light_gray_10,
  isFilled: false
}

export default AddIcon
