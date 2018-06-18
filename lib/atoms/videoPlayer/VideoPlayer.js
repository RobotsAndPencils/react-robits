import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './videoPlayer.module.scss'
import ReactPlayer from 'react-player'

const VideoPlayer = ({url, ...props}) => {
  return (
    <div styleName='wrapper' {...props}>
      <ReactPlayer height={0} width={0} url={url} />
    </div>
  )
}

VideoPlayer.propTypes = {
  url: PropTypes.string
}

export default CSSModules(VideoPlayer, styles)
