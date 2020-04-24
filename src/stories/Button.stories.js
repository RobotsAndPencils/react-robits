import React from 'react'
import { action } from '@storybook/addon-actions'
import { boolean, select } from '@storybook/addon-knobs'
import Button, { Button as ButtonComponent } from '../core/components/button/Button'
import ButtonGroup from '../core/components/buttonGroup/ButtonGroup'

const reconcileCorners = componentKnobs => {
  const cornersStyle = {
    squared: false,
    pill: false
  }

  if (componentKnobs.corners !== 'normal') {
    cornersStyle[componentKnobs.corners] = true
  }

  delete componentKnobs.corners
  return Object.assign({}, componentKnobs, cornersStyle)
}

export default {
  title: 'Robits/Button',
  component: ButtonComponent
}

export const Normal = ({ themeName }) => {
  let componentKnobs = {
    isLoading: boolean('Loading', false),
    disabled: boolean('Disabled', false),
    corners: select('Corners Style', ['normal', 'pill', 'squared'], 'normal'),
    outline: boolean('Outlined', false),
    active: boolean('Active', false),
    tag: select('Tag', ['button', 'a'], 'button')
  }
  componentKnobs = reconcileCorners(componentKnobs)

  return (
    <>
      <Button
        {...componentKnobs}
        themeName={themeName}
        styleType='primary'
        onClick={action('clicked')}>
        Hello Button
      </Button>
      <Button
        {...componentKnobs}
        themeName={themeName}
        styleType='secondary'
        onClick={action('clicked')}>
        Hello Button
      </Button>
      <Button
        {...componentKnobs}
        themeName={themeName}
        styleType='success'
        onClick={action('clicked')}>
        Hello Button
      </Button>
      <Button
        {...componentKnobs}
        themeName={themeName}
        styleType='info'
        onClick={action('clicked')}>
        Hello Button
      </Button>
      <Button
        {...componentKnobs}
        themeName={themeName}
        styleType='warning'
        onClick={action('clicked')}>
        Hello Button
      </Button>
      <Button
        {...componentKnobs}
        themeName={themeName}
        styleType='danger'
        onClick={action('clicked')}>
        Hello Button
      </Button>
      <Button
        {...componentKnobs}
        themeName={themeName}
        styleType='primary'
        ghost
        onClick={action('clicked')}>
        Hello Button
      </Button>
      <Button
        {...componentKnobs}
        themeName={themeName}
        styleType='light'
        onClick={action('clicked')}>
        Hello Button
      </Button>
      <Button
        {...componentKnobs}
        themeName={themeName}
        styleType='dark'
        onClick={action('clicked')}>
        Hello Button
      </Button>
    </>
  )
}

export const Sizes = ({ themeName }) => {
  let componentKnobs = {
    isLoading: boolean('Loading', false),
    disabled: boolean('Disabled', false),
    corners: select('Corners Style', ['normal', 'pill', 'squared'], 'normal'),
    outline: boolean('Outlined', false),
    active: boolean('Active', false),
    tag: select('Tag', ['button', 'a'], 'button')
  }
  componentKnobs = reconcileCorners(componentKnobs)

  return (
    <>
      <Button {...componentKnobs} themeName={themeName} size='lg' onClick={action('clicked')}>
        Hello Button
      </Button>
      <Button {...componentKnobs} themeName={themeName} onClick={action('clicked')}>
        Hello Button
      </Button>
      <Button {...componentKnobs} themeName={themeName} size='sm' onClick={action('clicked')}>
        Hello Button
      </Button>
    </>
  )
}

export const Block = ({ themeName }) => {
  let componentKnobs = {
    isLoading: boolean('Loading', false),
    disabled: boolean('Disabled', false),
    corners: select('Corners Style', ['normal', 'pill', 'squared'], 'normal'),
    outline: boolean('Outlined', false),
    active: boolean('Active', false),
    tag: select('Tag', ['button', 'a'], 'button')
  }
  componentKnobs = reconcileCorners(componentKnobs)

  return (
    <>
      <Button {...componentKnobs} themeName={themeName} block onClick={action('clicked')}>
        Hello Button
      </Button>
      <Button
        {...componentKnobs}
        themeName={themeName}
        block
        styleType='secondary'
        onClick={action('clicked')}>
        Hello Button
      </Button>
    </>
  )
}

export const Groups = ({ themeName }) => {
  const vertical = boolean('Vertical', false)
  const size = select('Size', ['sm', 'md', 'lg'], 'md')

  return (
    <ButtonGroup vertical={vertical} themeName={themeName}>
      <Button themeName={themeName} size={size} styleType='success' onClick={action('Positive')}>
        Positive
      </Button>
      <Button themeName={themeName} size={size} styleType='secondary' onClick={action('Neutral')}>
        Neutral
      </Button>
      <Button themeName={themeName} size={size} styleType='danger' onClick={action('Negative')}>
        Negative
      </Button>
    </ButtonGroup>
  )
}
