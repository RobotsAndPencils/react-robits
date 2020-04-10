import React from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import classNames from 'classnames'
import { toNumber } from 'lodash'

/**
 * You can use the `Progress Bar` component to display simple or complex progress bars.
 */
export const ProgressBar = ({
  animated,
  barClassName,
  barColor,
  bar,
  children,
  className,
  label,
  max = 100,
  multi,
  striped,
  styling,
  size,
  tag: Tag = 'div',
  value = 0,
  ...rest
}) => {
  const percent = (toNumber(value) / toNumber(max)) * 100
  const progressClasses = classNames(
    className,
    size && styling[`progress-${size}`],
    styling.progress
  )

  const progressBarClasses = classNames(
    styling['progress-bar'],
    bar ? className || barClassName : barClassName,
    animated && styling['progress-bar-animated'],
    barColor && styling[`bg-${barColor}`],
    (striped || animated) && styling['progress-bar-striped']
  )

  const ProgressBar = multi ? (
    children
  ) : (
    <div
      className={progressBarClasses}
      style={{ width: `${percent}%` }}
      role='progressbar'
      aria-valuenow={value}
      aria-valuemin='0'
      aria-valuemax={max}>
      {children}
    </div>
  )

  if (bar) {
    return ProgressBar
  }

  return (
    <>
      {label ? <label>{label}</label> : []}
      <Tag {...rest} className={progressClasses}>
        {ProgressBar}
      </Tag>
    </>
  )
}

ProgressBar.propTypes = {
  /**
   * Whether it is animated, or not.
   */
  animated: PropTypes.bool,
  /**
   * Whether it is a bar, or not.
   */
  bar: PropTypes.bool,
  /**
   * The class name for the bar element.
   */
  barClassName: PropTypes.string,
  /**
   * The bar color.
   */
  barColor: PropTypes.string,
  /**
   * The children nodes.
   */
  children: PropTypes.node,
  /**
   * The class name.
   */
  className: PropTypes.string,
  /**
   * Optional label to show above the component
   */
  label: PropTypes.string,
  /**
   * Whether there are multiple progress bars nested, or not.
   */
  multi: PropTypes.bool,
  /**
   * The max value. Defaults to 100
   */
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Whether it is striped, or not.
   */
  striped: PropTypes.bool,
  /**
   * Which of the preset sizes of the component to display. One of ['sm', 'md', 'lg']
   */
  size: PropTypes.string,
  /**
   * The component's tag type. Defaults to 'div'
   */
  tag: PropTypes.string,
  /**
   * The value.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default ThemeWrapper(themeName => `progressBar/progressBar_${themeName}.module.scss`)(
  ProgressBar
)
