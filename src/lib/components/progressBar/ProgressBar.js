import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ThemeWrapper from '../../utils/ThemeWrapper'
import * as themes from './themes'
import classNames from 'classnames'
import { toNumber } from 'lodash'

/**
 * You can use the `Progress Bar` component to display simple or complex progress bars.
 */
export const ProgressBar = ({
  label,
  styling,
  children,
  className,
  barClassName,
  value = 0,
  max = 100,
  animated,
  striped,
  barColor,
  bar,
  multi,
  size,
  tag: Tag = 'div',
  ...rest
}) => {
  useEffect(() => {
    styling.use()
    return () => {
      styling.unuse()
    }
  }, [styling])

  const percent = (toNumber(value) / toNumber(max)) * 100
  const progressClasses = classNames(
    className,
    size && styling.locals[`progress-${size}`],
    styling.locals.progress
  )

  const progressBarClasses = classNames(
    styling.locals['progress-bar'],
    bar ? className || barClassName : barClassName,
    animated && styling.locals['progress-bar-animated'],
    barColor && styling.locals[`bg-${barColor}`],
    (striped || animated) && styling.locals['progress-bar-striped']
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
      aria-valuemax={max}
    >
      {children}
    </div>
  )

  if (bar) {
    return ProgressBar
  }

  return (
    <>
      {
        label
          ? (
            <label>
              {label}
            </label>
          )
          : []
      }
      <Tag {...rest} className={progressClasses}>
        {ProgressBar}
      </Tag>
    </>
  )
}

ProgressBar.propTypes = {
  /**
   * The children nodes.
   */
  children: PropTypes.node,
  /**
   * Whether it is a bar, or not.
   */
  bar: PropTypes.bool,
  /**
   * Whether there are multiple progress bars nested, or not.
   */
  multi: PropTypes.bool,
  /**
   * The component's tag type.
   */
  tag: PropTypes.string,
  /**
   * Whether it is animated, or not.
   */
  animated: PropTypes.bool,
  /**
   * Whether it is striped, or not.
   */
  striped: PropTypes.bool,
  /**
   * The bar color.
   */
  barColor: PropTypes.string,
  /**
   * The class name.
   */
  className: PropTypes.string,
  /**
   * The class name for the bar element.
   */
  barClassName: PropTypes.string,
  /**
   * The value.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * The max value.
   */
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default ThemeWrapper(themes)(ProgressBar)
