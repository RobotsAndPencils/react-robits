import React from 'react'
import PropTypes from 'prop-types'
import styles from './videoPlayer.module.scss'
import ReactPlayer from 'react-player'

const VideoPlayer = ({url, ...props}) => {
  return (
    <div className={styles['wrapper']} {...props}>
      <ReactPlayer height={0} width={0} url={url} />
    </div>
  )
}

VideoPlayer.propTypes = {
  url: PropTypes.string
}

export default VideoPlayer
