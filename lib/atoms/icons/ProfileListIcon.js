import React from 'react'
import PropTypes from 'prop-types'
import colors from '../../../styles/_0colors.scss'

const ProfileListIcon = ({width, fillColor, ...props}) => {
  return (
    <svg {...props} width={width} viewBox='0 0 83 44' version='1.1' xmlns='http://www.w3.org/2000/svg'>
      <title>ProfileListIcon</title>
      <defs>
        <circle id='path-1' cx='21' cy='21' r='21' />
      </defs>
      <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
        <g id='Artboard'>
          <g id='Group-4-Copy' transform='translate(1.000000, 1.000000)'>
            <g id='Group'>
              <mask id='mask-2' fill='white'>
                <use xlinkHref='#path-1' />
              </mask>
              <use id='Mask' stroke={fillColor} strokeWidth='2' xlinkHref='#path-1' />
              <g mask='url(#mask-2)' stroke={fillColor} strokeWidth='2'>
                <g transform='translate(5.600000, 9.000000)'>
                  <circle id='Oval-5' cx='15.35' cy='7.35' r='7.35' />
                  <path d='M1,38 L30.5,38 L30.5,29.1999998 C30.5,23.5666955 25.9333045,19 20.3000002,19 L11.1999998,19 C5.56669547,19 1,23.5666955 1,29.1999998 L1,38 Z' id='Rectangle-6' />
                </g>
              </g>
            </g>
            <g id='Group-2' transform='translate(52.000000, 9.000000)' stroke={fillColor}>
              <ellipse id='Oval-6' strokeWidth='0.699999988' fill={fillColor} cx='2.07142857' cy='2.11764706' rx='2.07142857' ry='2.11764706' />
              <ellipse id='Oval-6-Copy' strokeWidth='0.699999988' fill={fillColor} cx='2.07142857' cy='12' rx='2.07142857' ry='2.11764706' />
              <ellipse id='Oval-6-Copy-2' strokeWidth='0.699999988' fill={fillColor} cx='2.07142857' cy='22.1176471' rx='2.07142857' ry='2.11764706' />
              <path d='M8,2 L28.7142857,2' id='Path-7' strokeWidth='2' strokeLinecap='round' />
              <path d='M8,12 L28.7142857,12' id='Path-7-Copy' strokeWidth='2' strokeLinecap='round' />
              <path d='M8,22 L28.7142857,22' id='Path-7-Copy-2' strokeWidth='2' strokeLinecap='round' />
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

ProfileListIcon.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  fillColor: PropTypes.string
}

ProfileListIcon.defaultProps = {
  width: 83,
  fillColor: colors.x_primary_action
}

export default ProfileListIcon
