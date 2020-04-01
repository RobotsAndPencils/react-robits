import React from 'react'
import { action } from '@storybook/addon-actions'
import { boolean, select } from '@storybook/addon-knobs'
import Button, { Button as ButtonComponent } from '../lib/components/button/Button'
import ButtonGroup from '../lib/components/buttonGroup/ButtonGroup'

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
  title: 'Robits/Button',
  component: ButtonComponent
}

export const Normal = ({ theme }) => {
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
      <Button {...componentKnobs} theme={theme} styleType='primary' onClick={action('clicked')}>
        Hello Button
      </Button>
      <Button {...componentKnobs} theme={theme} styleType='secondary' onClick={action('clicked')}>
        Hello Button
      </Button>
      <Button {...componentKnobs} theme={theme} styleType='success' onClick={action('clicked')}>
        Hello Button
      </Button>
      <Button {...componentKnobs} theme={theme} styleType='info' onClick={action('clicked')}>
        Hello Button
      </Button>
      <Button {...componentKnobs} theme={theme} styleType='warning' onClick={action('clicked')}>
        Hello Button
      </Button>
      <Button {...componentKnobs} theme={theme} styleType='danger' onClick={action('clicked')}>
        Hello Button
      </Button>
      <Button
        {...componentKnobs}
        theme={theme}
        styleType='primary'
        ghost
        onClick={action('clicked')}>
        Hello Button
      </Button>
      <Button {...componentKnobs} theme={theme} styleType='light' onClick={action('clicked')}>
        Hello Button
      </Button>
      <Button {...componentKnobs} theme={theme} styleType='dark' onClick={action('clicked')}>
        Hello Button
      </Button>
    </>
  )
}

export const Sizes = ({ theme }) => {
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
      <Button {...componentKnobs} theme={theme} size='lg' onClick={action('clicked')}>
        Hello Button
      </Button>
      <Button {...componentKnobs} theme={theme} onClick={action('clicked')}>
        Hello Button
      </Button>
      <Button {...componentKnobs} theme={theme} size='sm' onClick={action('clicked')}>
        Hello Button
      </Button>
    </>
  )
}

export const Block = ({ theme }) => {
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
      <Button {...componentKnobs} theme={theme} block onClick={action('clicked')}>
        Hello Button
      </Button>
      <Button
        {...componentKnobs}
        theme={theme}
        block
        styleType='secondary'
        onClick={action('clicked')}>
        Hello Button
      </Button>
    </>
  )
}

export const Groups = ({ theme }) => {
  const vertical = boolean('Vertical', false)
  const size = select('Size', ['sm', 'md', 'lg'], 'md')

  return (
    <ButtonGroup vertical={vertical} theme={theme}>
      <Button theme={theme} size={size} styleType='success' onClick={action('Positive')}>
        Positive
      </Button>
      <Button theme={theme} size={size} styleType='secondary' onClick={action('Neutral')}>
        Neutral
      </Button>
      <Button theme={theme} size={size} styleType='danger' onClick={action('Negative')}>
        Negative
      </Button>
    </ButtonGroup>
  )
}
