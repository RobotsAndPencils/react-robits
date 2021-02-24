import React from 'react'
import { useState } from '@storybook/client-api'
import { array } from '@storybook/addon-knobs'
import Tabs, { Tabs as TabsComponent } from '../core/components/tabs/Tabs'
import Button from '../core/components/button/Button'
import { POPPER_PLACEMENTS } from '../core/constants/constants'

export default {
  title: 'Robits/Tabs',
  component: TabsComponent
}

export const Normal = ({ themeName }) => {
  const tabOptions = [
    { label: 'Tab 1', enabled: true },
    { label: 'Tab 2', enabled: true }
  ]
  const [activeTab, setActiveTab] = useState(tabOptions[0].label)

  const handleTabChange = tab => {
    if (tab) {
      setActiveTab(tab)
    }
  }

  return (
    <>
      <Tabs
        themeName={themeName}
        defaultActiveTab={activeTab}
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
