import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { KEYCODES } from '../../constants/constants'
import ThemeWrapper from '../../utils/ThemeWrapper'

const Tab = ({ styling, isActive, item, onTabChange, ...rest }) => {
  const tabStyle = classNames(
    styling.tab,
    isActive && styling.active,
    !item.enabled && styling.disabled
  )

  const handleClick = useCallback(() => {
    onTabChange(item)
  }, [onTabChange])

  const handleKeyPress = useCallback(
    event => {
      if ([KEYCODES.SPACE, KEYCODES.ENTER].includes(event.charCode)) {
        event.preventDefault()
        onTabChange(item)
      }
    },
    [onTabChange]
  )

  return (
    <li
      tabIndex={0}
      className={tabStyle}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      {...rest}>
      {item.label}
    </li>
  )
}

export const Tabs = ({
  activeTab,
  className = '',
  defaultActiveTab,
  onChangeCallback = () => {},
  options = [],
  styling,
  ...rest
}) => {
  // The initial selected tab is either `activeTab`, `defaultActiveTab`, or undefined (unset), evaluated in that order
  const [selectedTab, setSelectedTab] = useState(activeTab || defaultActiveTab)

  /* When `activeTab` prop changes, update the selected tab */
  useEffect(() => {
    if (activeTab) {
      setSelectedTab(activeTab)
    }
  }, [activeTab])

  const containerStyle = classNames(className, styling.container)

  const handleTabChange = useCallback(
    item => {
      if (item.enabled) {
        /* When `activeTab` prop is provided, it is a controlled component; let the parent
           component handle the change. Otherwise, update the active tab internally */
        if (!activeTab) {
          setSelectedTab(item?.label)
        }

        if (onChangeCallback) {
          onChangeCallback(item?.label)
        }
      }
    },
    [activeTab, onChangeCallback]
  )

  return (
    <div className={containerStyle}>
      <ul className={styling['tab-list']}>
        {options.map((item, index) => (
          <Tab
            styling={styling}
            isActive={selectedTab === item.label}
            key={index}
            item={item}
            onTabChange={() => handleTabChange(item)}
            {...rest}
          />
        ))}
      </ul>
    </div>
  )
}

Tabs.propTypes = {
  /**
   * Optional tab option label property that makes this a controlled component
   */
  activeTab: PropTypes.string,

  /**
   * Optional custom class for instance level CSS overrides. String is directly applied and will not be further modularized to this component
   */
  className: PropTypes.string,

  /**
   * Optional tab option label property that sets the initial default value, but leaves the component uncontrolled
   */
  defaultActiveTab: PropTypes.string,

  /**
   * Callback function to retrieve the current active tab. It will pass in the name of the current tab as a string.
   */
  onChangeCallback: PropTypes.func,

  /**
   * Array of tab options
   */
  options: PropTypes.array
}

export default ThemeWrapper(themeName => `tabs/tabs_${themeName}.module.scss`)(Tabs)
