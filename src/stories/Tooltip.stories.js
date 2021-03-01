import React from 'react'
import { useRef, useState } from '@storybook/client-api'
import { select, text } from '@storybook/addon-knobs'
import Tooltip, { Tooltip as TooltipComponent } from '../core/components/tooltip/Tooltip'
import SvgIcon from '../core/components/icon/SvgIcon'
import demoIcons from './pages/demoIcons'
import { POPPER_PLACEMENTS } from '../core/constants/constants'

export default {
  title: 'Robits/Tooltip',
  component: TooltipComponent
}

export const Normal = ({ themeName }) => {
  const componentKnobs = {
    placement: select('Placement', POPPER_PLACEMENTS, 'top')
  }
  const content = text('Content', 'Tooltip text')

  const [showTooltip, setShowTooltip] = useState(false)
  const tooltipRef = useRef(null)

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        height: '300px',
        justifyContent: 'center',
        width: '100%'
      }}>
      <span ref={tooltipRef}>
        <SvgIcon source={demoIcons} name='info' width='20' />
      </span>
      <Tooltip
        themeName={themeName}
        {...componentKnobs}
        open={showTooltip}
        target={tooltipRef}
        toggle={open => {
          setShowTooltip(!open)
        }}>
        {content}
      </Tooltip>
    </div>
  )
}
