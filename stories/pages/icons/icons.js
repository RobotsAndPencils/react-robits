import React from 'react'
import PropTypes from 'prop-types'
import styles from './icons.module.scss'
import getDisplayName from 'react-display-name'

// icons
import ChevronIcon from '../../../lib/atoms/icons/ChevronIcon'
import XIcon from '../../../lib/atoms/icons/XIcon'
import MapMarkerIcon from '../../../lib/atoms/icons/MapMarkerIcon'
import LocationIcon from '../../../lib/atoms/icons/LocationIcon'
import HeartIcon from '../../../lib/atoms/icons/HeartIcon'
import SearchIcon from '../../../lib/atoms/icons/SearchIcon'

const Icons = ({fillColor, width, isFilled}) => {
  let iconComponents = [
    MapMarkerIcon,
    HeartIcon,
    ChevronIcon,
    LocationIcon,
    SearchIcon,
    XIcon
  ]

  let iconList = iconComponents.map(name => {
    let IconName = name
    return (
      <div key={IconName} className={styles['icon-container']}>
        <div title={getDisplayName(name)}>
          <IconName width={width} fillColor={fillColor} isFilled={isFilled} />
        </div>
      </div>
    )
  })

  return (
    <div>
      <div className={styles['icons-grid']}>
        {iconList}
      </div>
    </div>
  )
}

Icons.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.number,
  isFilled: PropTypes.bool
}

export default Icons
