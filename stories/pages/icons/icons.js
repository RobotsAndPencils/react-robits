import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './icons.module.scss'
import Tooltip from 'react-bootstrap/lib/Tooltip'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import getDisplayName from 'react-display-name'

// icons
import CalendarIcon from '../../../lib/atoms/icons/CalendarIcon'
import ChevronIcon from '../../../lib/atoms/icons/ChevronIcon'
import CopyIcon from '../../../lib/atoms/icons/CopyIcon'
import EnvelopeIcon from '../../../lib/atoms/icons/EnvelopeIcon'
import ExclamationIcon from '../../../lib/atoms/icons/ExclamationIcon'
import LockIcon from '../../../lib/atoms/icons/LockIcon'
import MoneyIcon from '../../../lib/atoms/icons/MoneyIcon'
import PersonSquareIcon from '../../../lib/atoms/icons/PersonSquareIcon'
import QuestionMarkIcon from '../../../lib/atoms/icons/QuestionMarkIcon'
import XIcon from '../../../lib/atoms/icons/XIcon'
import MapMarkerIcon from '../../../lib/atoms/icons/MapMarkerIcon'
import LocationIcon from '../../../lib/atoms/icons/LocationIcon'
import ChatIcon from '../../../lib/atoms/icons/ChatIcon'
import HeartIcon from '../../../lib/atoms/icons/HeartIcon'
import VideoIcon from '../../../lib/atoms/icons/VideoIcon'
import InPersonIcon from '../../../lib/atoms/icons/InPersonIcon'
import UploadIcon from '../../../lib/atoms/icons/UploadIcon'
import DownloadIcon from '../../../lib/atoms/icons/DownloadIcon'
import CardIcon from '../../../lib/atoms/icons/CardIcon'
import SearchIcon from '../../../lib/atoms/icons/SearchIcon'
import MinusIcon from '../../../lib/atoms/icons/MinusIcon'
import ProfileListIcon from '../../../lib/atoms/icons/ProfileListIcon'
import InfoIcon from '../../../lib/atoms/icons/InfoIcon'
import LyraStarIcon from '../../../lib/atoms/icons/LyraStarIcon'
import CheckIcon from '../../../lib/atoms/icons/CheckIcon'
import MoneySquareIcon from '../../../lib/atoms/icons/moneySquareIcon'
import DuplicatePaymentIcon from '../../../lib/atoms/icons/DuplicatePaymentIcon'
import EditIcon from '../../../lib/atoms/icons/EditIcon'
import AddIcon from '../../../lib/atoms/icons/AddIcon'
import ListIcon from '../../../lib/atoms/icons/ListIcon'
import LyraLogoIcon from '../../../lib/atoms/icons/LyraLogo'

const Icons = ({fillColor, width, isFilled}) => {
  let iconComponents = [
    ExclamationIcon,
    CardIcon,
    DownloadIcon,
    MapMarkerIcon,
    DuplicatePaymentIcon,
    InPersonIcon,
    CheckIcon,
    CopyIcon,
    HeartIcon,
    QuestionMarkIcon,
    ChatIcon,
    ChevronIcon,
    LockIcon,
    LocationIcon,
    EnvelopeIcon,
    UploadIcon,
    EditIcon,
    VideoIcon,
    MinusIcon,
    SearchIcon,
    PersonSquareIcon,
    CalendarIcon,
    AddIcon,
    MoneySquareIcon,
    XIcon,
    ListIcon,
    MoneyIcon,
    LyraLogoIcon,
    ProfileListIcon,
    InfoIcon,
    LyraStarIcon
  ]
  let iconList = iconComponents.map(function (name) {
    let IconName = name
    let tooltip = (
      <Tooltip id='icon-name'>{getDisplayName(name)}</Tooltip>
    )
    return (
      <div key={IconName} styleName='icon-container'>
        <OverlayTrigger placement='bottom' overlay={tooltip}>
          <div>
            <IconName width={width} fillColor={fillColor} isFilled={isFilled} />
          </div>
        </OverlayTrigger>
      </div>
    )
  })

  return (
    <div>
      <div styleName='icons-grid'>
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

export default CSSModules(Icons, styles, {allowMultiple: true})
