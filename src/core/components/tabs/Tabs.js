import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { KEYCODES } from '../../constants/constants'
import ThemeWrapper from '../../utils/ThemeWrapper'

export const Tabs = ({
  activeTab,
  className = '',
  defaultActiveTab,
  onChangeCallback = () => {},
  options = [],
  styling,
  ...rest
}) => {
  const [selectedTab, setSelectedTab] = useState(activeTab || defaultActiveTab)

  useEffect(() => {
    const selectedTab = options.find(i => i.label === (activeTab || defaultActiveTab))
    if (selectedTab) {
      setSelectedTab(selectedTab.label)
    }
  }, [activeTab, defaultActiveTab, options])

  const containerStyle = classNames(className, styling.container)

  const handleKeyPress = (e, item) => {
    if ([KEYCODES.SPACE, KEYCODES.ENTER].includes(e.charCode)) {
      e.preventDefault()
      setSelectedTab(item)
    }
  }

  const Tab = ({ item }) => {
    const tabStyle = classNames(
      styling.tab,
      selectedTab === item.label && styling.active,
      !item.enabled && styling.disabled
    )

    return (
      <li
        tabIndex={0}
        className={tabStyle}
        onClick={() => {
          if (item.enabled) {
            setSelectedTab(activeTab || item.label)
            if (onChangeCallback) {
              onChangeCallback(activeTab || item.label)
            }
          }
        }}
        onKeyPress={e => handleKeyPress(e, item.label)}
        {...rest}>
        {item.label}
      </li>
    )
  }

  return (
    <div className={containerStyle}>
      <ul className={styling['tab-list']}>
        {options.map((item, index) => (
          <Tab key={index} item={item} />
        ))}
      </ul>
    </div>
  )
}

Tabs.propTypes = {
  /**
   * Optional property that makes this a controlled component
   */
  activeTab: PropTypes.string,

  /**
   * Optional custom class for instance level CSS overrides. String is directly applied and will not be further modularized to this component
   */
  className: PropTypes.string,

  /**
   * Optional property that sets the initial default value, but leaves the component uncontrolled
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
