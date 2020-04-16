import React from 'react'
import PropTypes from 'prop-types'

/**
 * Renders an SVG as a React component. If using Create React App, it's recommended to use their built in method. This is more for apps not using that as a bootstrap
 */
const SvgIcon = ({ source, name, width, height = 'auto', ...props }) => {
  const icon = source[name]
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width || icon.width || '24'}
      height={height || icon.height}
      viewBox={icon.viewBox}
      dangerouslySetInnerHTML={{ __html: icon.path }}
      name={name}
      {...props}
    />
  )
}

SvgIcon.propTypes = {
  /** The name of the Javascript source file, that holds the name-svg mappings */
  source: PropTypes.object.isRequired,
  /** The name of the SVG icon to render */
  name: PropTypes.string.isRequired,
  /** The width of SVG */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** The height of SVG */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** An optional class name for customization */
  className: PropTypes.string
}

export default SvgIcon
