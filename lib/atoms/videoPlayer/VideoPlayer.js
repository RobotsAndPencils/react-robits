import React from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../ThemeWrapper'
import defaultStyles from './videoPlayer.module.scss'
import ReactPlayer from 'react-player'

const VideoPlayer = ({url, ...props}) => {
  return (
    <div className={this.props.styling['wrapper']} {...props}>
      <ReactPlayer height={0} width={0} url={url} />
    </div>
  )
}

VideoPlayer.propTypes = {
  url: PropTypes.string,
  styling: PropTypes.object
}

export default ThemeWrapper({defaultStyles})(VideoPlayer)
