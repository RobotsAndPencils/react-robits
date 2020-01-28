import React from 'react';
import { action } from '@storybook/addon-actions';
import Button, { Button as ButtonComponent } from '../lib/components/button/Button'

export default {
  title: 'Robits/Button',
  component: ButtonComponent
}

export const Normal = ({ theme }) => {
  return (
    <>
      <Button theme={theme} styleType='primary' onClick={action('clicked')}>Hello Button</Button>
      <Button theme={theme} styleType='secondary' onClick={action('clicked')}>Hello Button</Button>
      <Button theme={theme} styleType='success' onClick={action('clicked')}>Hello Button</Button>
      <Button theme={theme} styleType='info' onClick={action('clicked')}>Hello Button</Button>
      <Button theme={theme} styleType='warning' onClick={action('clicked')}>Hello Button</Button>
      <Button theme={theme} styleType='danger' onClick={action('clicked')}>Hello Button</Button>
      <Button theme={theme} styleType='light' onClick={action('clicked')}>Hello Button</Button>
      <Button theme={theme} styleType='dark' onClick={action('clicked')}>Hello Button</Button>
    </>
  )
}

export const Sizes = ({ theme }) => {
  return (
    <>
      <Button theme={theme} size='lg' onClick={action('clicked')}>Hello Button</Button>
      <Button theme={theme} onClick={action('clicked')}>Hello Button</Button>
      <Button theme={theme} size='sm' onClick={action('clicked')}>Hello Button</Button>
    </>
  )
}

export const Block = ({ theme }) => {
  return (
    <>
      <Button theme={theme} block onClick={action('clicked')}>Hello Button</Button>
      <Button theme={theme} block styleType='secondary' onClick={action('clicked')}>Hello Button</Button>
    </>
  )
}
