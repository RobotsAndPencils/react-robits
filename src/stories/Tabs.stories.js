import React from 'react'
import { useState, useEffect, useMemo } from '@storybook/client-api'
import Tabs, { Tabs as TabsComponent } from '../core/components/tabs/Tabs'
import FormCheckbox from '../core/components/formCheckbox/FormCheckbox'

export default {
  title: 'Robits/Tabs',
  component: TabsComponent
}

export const Normal = ({ themeName }) => {
  const tabOptions = useMemo(
    () => [
      { label: 'Tab 1', enabled: true },
      { label: 'Tab 2', enabled: true }
    ],
    []
  )

  const [activeTab, setActiveTab] = useState(tabOptions[0].label)
  const [isControlled, setIsControlled] = useState(false)

  // Reinitialize tab state
  useEffect(() => {
    setActiveTab(tabOptions[0].label)
  }, [isControlled, tabOptions])

  const handleTabChange = tab => {
    if (tab) {
      setActiveTab(tab)
    }
  }

  return (
    <>
      <FormCheckbox
        themeName={themeName}
        id='is-controlled-checkbox'
        toggle
        onChange={() => {
          setIsControlled(!isControlled)
        }}
        checked={isControlled}>
        Is Controlled
      </FormCheckbox>
      <Tabs
        themeName={themeName}
        defaultActiveTab={activeTab}
        activeTab={isControlled ? activeTab : undefined}
        options={tabOptions}
        onChangeCallback={handleTabChange}
      />
      {activeTab === tabOptions[0].label ? (
        <p>{tabOptions[0].label} Content</p>
      ) : (
        <p>{tabOptions[1].label} Content</p>
      )}
    </>
  )
}
