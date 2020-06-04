import React from 'react'
import { useState, useRef } from '@storybook/client-api'
import { boolean, select } from '@storybook/addon-knobs'
import Button from '../core/components/button/Button'
import Popover, { Popover as PopoverComponent } from '../core/components/popover/Popover'
import PopoverHeader from '../core/components/popover/PopoverHeader'
import PopoverBody from '../core/components/popover/PopoverBody'

export default {
  title: 'Robits/Popover',
  component: PopoverComponent
}

export const Normal = ({ themeName, count }) => {
  const componentKnobs = {
    disabled: boolean('Disabled', false),
    placement: select('Placement', ['top', 'bottom', 'left', 'right'], 'top'),
    noArrow: boolean('No Arrow', false)
    // delay: object('Delay', { SHOW: 0, HIDE: 0 })
  }

  const triggerRef = useRef(null)

  const [popoverState, setPopoverState] = useState(false)

  const toggle = () => {
    console.log('popping')
    setPopoverState(!popoverState)
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '500px'
      }}>
      <Button innerRef={triggerRef} themeName={themeName} onClick={toggle}>
        Trigger
      </Button>
      <Popover
        {...componentKnobs}
        open={popoverState}
        target={triggerRef}
        toggle={toggle}
        themeName={themeName}>
        {/* Note: the dynamic theming throws off the positioning, and will only work in your project with the ThemeWrapper stripped away
        <PopoverHeader themeName={themeName}>Title here</PopoverHeader>
        <PopoverBody themeName={themeName}>
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
          terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
          labore wes anderson cred nesciunt sapiente ea proident.
        </PopoverBody> */}
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad
        squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente
        ea proident.
      </Popover>
    </div>
  )
}
