import React from 'react'
import { action } from '@storybook/addon-actions'
import { text } from '@storybook/addon-knobs'
import Card, { Card as CardComponent } from '../core/components/card/Card'
import CardBody from '../core/components/card/CardBody'

const reconcileCorners = componentKnobs => {
  const cornersStyle = {
    squared: false,
    pill: false
  }

  if (componentKnobs.corners !== 'Normal') {
    cornersStyle[componentKnobs.corners] = true
  }

  delete componentKnobs.corners
  return Object.assign({}, componentKnobs, cornersStyle)
}

export default {
  title: 'Robits/Card',
  component: CardComponent
}

export const Normal = ({ themeName }) => {
  let componentKnobs = {
    header: text('Header', 'Card Header'),
    footer: text('Footer', 'Card Footer')
  }
  componentKnobs = reconcileCorners(componentKnobs)

  return (
    <Card {...componentKnobs} themeName={themeName} onClick={action('clicked')}>
      <CardBody themeName={themeName}>Card One</CardBody>
    </Card>
  )
}
