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
  editCallback,
  withShadow,
  squared,
  bordered,
  transparent,
  size = 'md',
  ...props
}) => {
  const [hasImage, setHasImage] = useState(false)

  useEffect(() => {
    styling.use()
    return () => {
      styling.unuse()
    }
  }, [styling])

  useEffect(() => {
    getImage(image)
  }, [image])

  const getImage = (src) => {
    imageUtils.imageExists(src).then(() => {
      setHasImage(true)
    }).catch(() => {
      setHasImage(false)
    })
  }

  const classes = classNames(
    className,
    styling.locals.avatar,
    size && styling.locals[`avatar-${size}`],
    editable && styling.locals.editable,
    squared && styling.locals.squared,
    bordered && styling.locals.bordered,
    transparent && styling.locals.transparent,
    withShadow && styling.locals['with-shadow'],
    hasImage && styling.locals['with-image']
  )

  return (
    <div className={classes} {...props} onClick={editable && editCallback ? editCallback : undefined}>
      {
        hasImage
          ? <img src={image} />
          : children
      }
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
  image: PropTypes.string
}

export default ThemeWrapper(themes)(Avatar)
