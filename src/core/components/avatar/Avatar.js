import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import classNames from 'classnames'
import imageUtils from '../../utils/imageUtils'

/**
 * Generic user avatar, with textual fallbacks for when no image is available
 */
export const Avatar = React.memo(
  ({
    bordered,
    className,
    children,
    editable,
    image,
    innerRef,
    squared,
    styling = {},
    size = 'md',
    transparent,
    withShadow,
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
)

Avatar.propTypes = {
  /**
   * Whether or not to display an inset border to matte the image
   */
  bordered: PropTypes.bool,
  /**
   * The children nodes.
   */
  children: PropTypes.node,
  /**
   * The class name.
   */
  className: PropTypes.string,
  /**
   * Whether or not the component display's its "edit" overlay when hovered. Expects an onClick was also provided
   */
  editable: PropTypes.bool,
  /**
   * The image source.
   */
  image: PropTypes.string,
  /**
   * The inner ref.
   * @type {[type]}
   */
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  /**
   * Whether or not the component should have squared off corners
   */
  squared: PropTypes.bool,
  /**
   * The size preset to display. One of ['sm', 'md', 'lg']
   */
  size: PropTypes.string,
  /**
   * Whether or not to forgoe the default white background
   */
  transparent: PropTypes.bool,
  /**
   * Whether or not to display the baked in shadow
   */
  withShadow: PropTypes.bool
}

export default ThemeWrapper(themeName => `avatar/avatar_${themeName}.module.scss`)(Avatar)
