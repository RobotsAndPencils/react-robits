import React from 'react'
import { useState, useRef, useEffect } from '@storybook/client-api'
import { action } from '@storybook/addon-actions'
import { boolean, select } from '@storybook/addon-knobs'
import Button from '../core/components/button/Button'
import Tooltip, { Tooltip as TooltipComponent } from '../core/components/tooltip/Tooltip'

export default {
  title: 'Robits/Tooltip',
  component: TooltipComponent
}

export const Normal = ({ themeName, count }) => {
  const componentKnobs = {
    disabled: boolean('Disabled', false),
    trigger: select('Trigger', ['hover', 'click', 'focus'], 'hover')
  }

  const topRef = useRef(null)
  const bottomRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  const [tooltipsState, setTooltipsState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  })

  const toggle = pos => {
    console.log('toggling')
    const newState = Object.assign({}, tooltipsState)
    newState[pos] = !newState[pos]
    setTooltipsState(newState)
  }

  return (
    <div style={{ padding: '50px' }}>
      <Button innerRef={topRef} themeName={themeName}>
        Top
      </Button>
      <Tooltip
        {...componentKnobs}
        open={tooltipsState.top}
        target={topRef}
        toggle={() => toggle('top')}
        themeName={themeName}>
        I am on top! ☝️
      </Tooltip>

      <Button innerRef={bottomRef} themeName={themeName}>
        Bottom
      </Button>
      <Tooltip
        {...componentKnobs}
        placement='bottom'
        open={tooltipsState.bottom}
        target={bottomRef}
        toggle={() => toggle('bottom')}
        themeName={themeName}>
        I am at the bottom! 👇
      </Tooltip>

      <Button innerRef={leftRef} themeName={themeName}>
        Left
      </Button>
      <Tooltip
        {...componentKnobs}
        placement='left'
        open={tooltipsState.left}
        target={leftRef}
        toggle={() => toggle('left')}
        themeName={themeName}>
        I am on the left! 👈
      </Tooltip>

      <Button innerRef={rightRef} themeName={themeName}>
        Right
      </Button>
      <Tooltip
        {...componentKnobs}
        placement='right'
        open={tooltipsState.right}
        target={rightRef}
        toggle={() => toggle('right')}
        themeName={themeName}>
        I am on the right! 👉
      </Tooltip>
    </div>
  )
}
