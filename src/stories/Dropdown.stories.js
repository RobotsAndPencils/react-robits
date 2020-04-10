import React from 'react'
import { useState } from '@storybook/client-api'
import { action } from '@storybook/addon-actions'
import { boolean, select } from '@storybook/addon-knobs'
import Dropdown, { Dropdown as DropdownComponent } from '../lib/components/dropdown/Dropdown'
import Button from '../lib/components/button/Button'
import DropdownToggle from '../lib/components/dropdown/DropdownToggle'
import DropdownMenu from '../lib/components/dropdown/DropdownMenu'
import DropdownItem from '../lib/components/dropdown/DropdownItem'
import ButtonGroup from '../lib/components/buttonGroup/ButtonGroup'

export default {
  title: 'Robits/Dropdown',
  component: DropdownComponent
}

export const Normal = ({ themeName }) => {
  const componentKnobs = {
    disabled: boolean('Disabled', false),
    direction: select('Preferred Direction', ['up', 'down', 'left', 'right'], 'down')
  }

  const caret = boolean('With Caret', false)
  const size = select('Size', ['sm', 'md', 'lg'], 'md')
  const alignment = select('Menu Alignment ', ['center', 'left', 'right'], 'center')

  const [open, toggleOpen] = useState(false)

  return (
    <>
      <Dropdown
        {...componentKnobs}
        themeName={themeName}
        open={open}
        toggle={() => toggleOpen(!open)}>
        <DropdownToggle
          caret={caret}
          size={size}
          disabled={componentKnobs.disabled}
          themeName={themeName}>
          Options
        </DropdownToggle>
        <DropdownMenu themeName={themeName} size={size} alignment={alignment}>
          <DropdownItem themeName={themeName} onClick={action('Clicked dropdown item: Action')}>
            Action
          </DropdownItem>
          <DropdownItem
            active
            themeName={themeName}
            onClick={action('Clicked dropdown item: Another action')}>
            Another action
          </DropdownItem>
          <DropdownItem
            themeName={themeName}
            onClick={action('Clicked dropdown item: Else action')}>
            Something else here
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}

export const Split = ({ themeName }) => {
  const componentKnobs = {
    disabled: boolean('Disabled', false),
    direction: select('Direction', ['up', 'down', 'left', 'right'], 'down')
  }

  const size = select('Size', ['sm', 'md', 'lg'], 'md')

  const [open, toggleOpen] = useState(false)

  return (
    <>
      <Dropdown
        {...componentKnobs}
        themeName={themeName}
        open={open}
        toggle={() => toggleOpen(!open)}>
        <ButtonGroup themeName={themeName}>
          <Button size={size} disabled={componentKnobs.disabled} themeName={themeName}>
            Options
          </Button>
          <DropdownToggle
            split
            size={size}
            disabled={componentKnobs.disabled}
            themeName={themeName}
          />
        </ButtonGroup>
        <DropdownMenu themeName={themeName} size={size}>
          <DropdownItem themeName={themeName} onClick={action('Clicked dropdown item: Action')}>
            Action
          </DropdownItem>
          <DropdownItem
            themeName={themeName}
            onClick={action('Clicked dropdown item: Another action')}>
            Another action
          </DropdownItem>
          <DropdownItem
            themeName={themeName}
            onClick={action('Clicked dropdown item: Else action')}>
            Something else here
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}
