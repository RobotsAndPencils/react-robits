import React from 'react'
import { action } from '@storybook/addon-actions'
import { boolean, select } from '@storybook/addon-knobs'
import Badge, { Badge as BadgeComponent } from '../lib/components/badge/Badge'

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
  title: 'Robits/Badge',
  component: BadgeComponent
}

export const Normal = ({ theme }) => {
  let componentKnobs = {
    corners: select('Corners Style', ['normal', 'pill', 'squared'], 'normal'),
    outline: boolean('Outlined', false),
    tag: select('Tag', ['span', 'a'], 'span'),
    removable: boolean('Removable', true)
  }
  componentKnobs = reconcileCorners(componentKnobs)

  return (
    <>
      <Badge {...componentKnobs} theme={theme} styleType='primary' onClick={action('removed')}>
        Hello Badge
      </Badge>
      <Badge {...componentKnobs} theme={theme} styleType='secondary' onClick={action('removed')}>
        Hello Badge
      </Badge>
      <Badge {...componentKnobs} theme={theme} styleType='success' onClick={action('removed')}>
        Hello Badge
      </Badge>
      <Badge {...componentKnobs} theme={theme} styleType='info' onClick={action('removed')}>
        Hello Badge
      </Badge>
      <Badge {...componentKnobs} theme={theme} styleType='warning' onClick={action('removed')}>
        Hello Badge
      </Badge>
      <Badge {...componentKnobs} theme={theme} styleType='danger' onClick={action('removed')}>
        Hello Badge
      </Badge>
      <Badge {...componentKnobs} theme={theme} styleType='light' onClick={action('removed')}>
        Hello Badge
      </Badge>
      <Badge {...componentKnobs} theme={theme} styleType='dark' onClick={action('removed')}>
        Hello Badge
      </Badge>
    </>
  )
}
