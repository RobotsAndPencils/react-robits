import React from 'react'
import Collapse, { Collapse as CollapseComponent } from '../lib/utils/Collapse'
import Button from '../lib/components/button/Button'
import { useState } from '@storybook/client-api'

export default {
  title: 'Robits/Collapse',
  component: CollapseComponent
}

export const Normal = ({ themeName }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <Button themeName={themeName} onClick={() => setIsOpen(!isOpen)}>
        Toggle
      </Button>
      <Collapse open={isOpen}>
        <div
          style={{
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '10px',
            marginTop: '15px'
          }}>
          <h5>😍 Now you see me!</h5>
          <span>
            In sagittis nibh non arcu viverra, nec imperdiet quam suscipit. Sed porta eleifend
            scelerisque. Vestibulum dapibus quis arcu a facilisis.
          </span>
        </div>
      </Collapse>
    </div>
  )
}
