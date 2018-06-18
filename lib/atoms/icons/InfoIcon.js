import React from 'react'
import PropTypes from 'prop-types'
import colors from '../../../styles/_0colors.scss'

const InfoIcon = ({width, fillColor}) => {
  return (
    <svg width={width} viewBox='0 0 11 11' version='1.1' xmlns='http://www.w3.org/2000/svg'>
      <title>InfoIcon</title>
      <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
        <rect id='Rectangle-4' fill={fillColor} x='5' y='5' width='1' height='4' />
        <circle id='Oval' fill={fillColor} cx='5.5' cy='3.5' r='.75' />
        <circle id='Oval-7' stroke={fillColor} cx='5.5' cy='5.5' r='5' />
      </g>
    </svg>
  )
}

InfoIcon.defaultProps = {
  fillColor: colors.x_primary_action,
  width: 11
}
InfoIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

export default InfoIcon
