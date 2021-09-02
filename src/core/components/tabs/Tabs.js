import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { KEYCODES } from '../../constants/constants'
import ThemeWrapper from '../../utils/ThemeWrapper'

const getOptionByLabel = ({ options = [], label } = {}) =>
  options.find(option => option.label === label)

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
  const activeTabOption = getOptionByLabel({ options, label: activeTab })
  const defaultActiveTabOption = getOptionByLabel({ options, label: defaultActiveTab })

  // The initial selected tab is either `activeTab`, `defaultActiveTab`, or undefined (unset), evaluated in that order
  const [selectedTab, setSelectedTab] = useState(activeTabOption || defaultActiveTabOption)

  /* When the component first renders or when `activeTab` or `defaultActiveTab` props
     change, update the selected tab */
  useEffect(() => {
    const selectedTab = options.find(option => option.label === (activeTab || defaultActiveTab))

    if (selectedTab) {
      setSelectedTab(selectedTab)
    }
  }, [activeTab, defaultActiveTab, options])

  const containerStyle = classNames(className, styling.container)

  const handleTabChange = useCallback(
    item => {
      if (item.enabled) {
        // When `activeTab` prop is provided, it is a controlled component
        setSelectedTab(activeTabOption || item)

        if (onChangeCallback) {
          onChangeCallback(item?.label)
        }
      }
    },
    [activeTabOption, onChangeCallback]
  )

  return (
    <div className={containerStyle}>
      <ul className={styling['tab-list']}>
        {options.map((item, index) => (
          <Tab
            styling={styling}
            isActive={selectedTab?.label === item.label}
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
