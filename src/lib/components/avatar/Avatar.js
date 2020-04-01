import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import * as themes from './themes'
import classNames from 'classnames'
import imageUtils from '../../utils/imageUtils'

/**
 * Generic avatar
 */
export const Avatar = ({
  styling,
  children,
  image,
  className,
  editable,
  withShadow,
  squared,
  bordered,
  transparent,
  size = 'md',
  innerRef,
  ...props
}) => {
  const [hasImage, setHasImage] = useState(false)

  useEffect(() => {
    getImage(image)
  }, [image])

  const getImage = src => {
    imageUtils
      .imageExists(src)
      .then(() => {
        setHasImage(true)
      })
      .catch(() => {
        setHasImage(false)
      })
  }

  const classes = classNames(
    className,
    styling.avatar,
    size && styling[`avatar-${size}`],
    editable && styling.editable,
    squared && styling.squared,
    bordered && styling.bordered,
    transparent && styling.transparent,
    withShadow && styling['with-shadow'],
    hasImage && styling['with-image'],
    props.onClick && 'clickable'
  )

  return (
    <div ref={innerRef} className={classes} {...props}>
      {hasImage ? <img src={image} alt='Avatar' /> : children}
    </div>
  )
}

Avatar.propTypes = {
  /**
   * The children nodes.
   */
  children: PropTypes.node,
  /**
   * The class name.
   */
  className: PropTypes.string,
  /**
   * The image source.
   */
  image: PropTypes.string,
  /**
   * The inner ref.
   * @type {[type]}
   */
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string])
}

export default ThemeWrapper(themes)(Avatar)
