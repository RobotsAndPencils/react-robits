import React from 'react'
import { useRef, useState } from '@storybook/client-api'
import { select, text } from '@storybook/addon-knobs'
import Popover, { Popover as PopoverComponent } from '../core/components/popover/Popover'
import Button from '../core/components/button/Button'
import { POPPER_PLACEMENTS } from '../core/constants/constants'

export default {
  title: 'Robits/Popover',
  component: PopoverComponent
}

export const Normal = ({ themeName }) => {
  const componentKnobs = {
    placement: select('Placement', POPPER_PLACEMENTS, 'top')
  }

  const content = text('Content', 'Hello World')

  const popoverButtonRef = useRef(null)
  const [popoverOpen, setPopoverOpen] = useState(false)

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        height: '300px',
        justifyContent: 'center',
        width: '100%'
      }}>
      <Button
        themeName={themeName}
        onClick={() => setPopoverOpen(!popoverOpen)}
        innerRef={popoverButtonRef}>
        Open Popover
      </Button>
      <Popover
        themeName={themeName}
        {...componentKnobs}
        open={popoverOpen}
        container='body'
        target={popoverButtonRef}>
        {content}
      </Popover>
    </div>
  )
}
