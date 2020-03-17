import React from 'react'
import { action } from '@storybook/addon-actions'
import { boolean, select } from '@storybook/addon-knobs'
import Dropdown, { Dropdown as DropdownComponent } from '../lib/components/dropdown/Dropdown'
import Button from '../lib/components/button/Button'
import DropdownToggle from '../lib/components/dropdown/DropdownToggle'
import DropdownMenu from '../lib/components/dropdown/DropdownMenu'
import DropdownItem from '../lib/components/dropdown/DropdownItem'
import UseState from './pages/UseState'
import ButtonGroup from '../lib/components/buttonGroup/ButtonGroup'

export default {
  title: 'Robits/Dropdown',
  component: DropdownComponent
}

export const Normal = ({ theme }) => {
  const componentKnobs = {
    disabled: boolean('Disabled', false),
    direction: select('Direction', ['up', 'down', 'left', 'right'], 'down')
  }

  const caret = boolean('With Caret', false)
  const size = select('Size', ['sm', 'md', 'lg'], 'md')

  return (
    <UseState
      initialValue={false}
      render={(open, toggleOpen) => (
        <>
          <Dropdown {...componentKnobs} theme={theme} open={open} toggle={() => toggleOpen(!open)}>
            <DropdownToggle
              caret={caret}
              size={size}
              disabled={componentKnobs.disabled}
              theme={theme}>
              Options
            </DropdownToggle>
            <DropdownMenu theme={theme}>
              <DropdownItem theme={theme} onClick={action('Clicked dropdown item: Action')}>
                Action
              </DropdownItem>
              <DropdownItem theme={theme} onClick={action('Clicked dropdown item: Another action')}>
                Another action
              </DropdownItem>
              <DropdownItem theme={theme} onClick={action('Clicked dropdown item: Else action')}>
                Something else here
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </>
      )}
    />
  )
}

export const Split = ({ theme }) => {
  const componentKnobs = {
    disabled: boolean('Disabled', false),
    direction: select('Direction', ['up', 'down', 'left', 'right'], 'down')
  }

  const size = select('Size', ['sm', 'md', 'lg'], 'md')

  return (
    <UseState
      initialValue={false}
      render={(open, toggleOpen) => (
        <>
          <Dropdown {...componentKnobs} theme={theme} open={open} toggle={() => toggleOpen(!open)}>
            <ButtonGroup>
              <Button size={size} disabled={componentKnobs.disabled} theme={theme}>
                Options
              </Button>
              <DropdownToggle split size={size} disabled={componentKnobs.disabled} theme={theme} />
            </ButtonGroup>
            <DropdownMenu theme={theme} size={size}>
              <DropdownItem theme={theme} onClick={action('Clicked dropdown item: Action')}>
                Action
              </DropdownItem>
              <DropdownItem theme={theme} onClick={action('Clicked dropdown item: Another action')}>
                Another action
              </DropdownItem>
              <DropdownItem theme={theme} onClick={action('Clicked dropdown item: Else action')}>
                Something else here
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </>
      )}
    />
  )
}
