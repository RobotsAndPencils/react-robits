import React from 'react'
import { useState } from '@storybook/client-api'
import { action } from '@storybook/addon-actions'
import { boolean } from '@storybook/addon-knobs'
import Alert, { Alert as AlertComponent } from '../lib/components/alert/Alert'
import Button from '../lib/components/button/Button'

export default {
  title: 'Robits/Alert',
  component: AlertComponent
}

export const Normal = ({ theme }) => {
  const [visible, setVisible] = useState(true)

  const componentKnobs = {
    centered: boolean('Centered', true),
    dismissible: boolean('Dismissible', false)
  }

  const dismiss = () => {
    setVisible(false)
  }

  if (componentKnobs.dismissible) {
    componentKnobs.dismissible = dismiss
  } else {
    componentKnobs.dismissible = undefined
  }

  return (
    <>
      <Alert open={visible} {...componentKnobs} theme={theme} styleType='primary'>
        Hello Alert
      </Alert>
      <Alert open={visible} {...componentKnobs} theme={theme} styleType='secondary'>
        Hello Alert
      </Alert>
      <Alert open={visible} {...componentKnobs} theme={theme} styleType='success'>
        Hello Alert
      </Alert>
      <Alert open={visible} {...componentKnobs} theme={theme} styleType='info'>
        Hello Alert
      </Alert>
      <Alert open={visible} {...componentKnobs} theme={theme} styleType='warning'>
        Hello Alert
      </Alert>
      <Alert open={visible} {...componentKnobs} theme={theme} styleType='danger'>
        Hello Alert
      </Alert>
      <Alert open={visible} {...componentKnobs} theme={theme} styleType='light'>
        Hello Alert
      </Alert>
      <Alert open={visible} {...componentKnobs} theme={theme} styleType='dark'>
        Hello Alert
      </Alert>
    </>
  )
}

export const SelfDismissing = ({ theme }) => {
  const [visible, setVisible] = useState(false)

  const showAlert = () => {
    setVisible(true)
    setTimeout(() => setVisible(false), 4000)
  }

  return (
    <>
      <Alert open={visible} theme={theme} styleType='success'>
        Your request was successful! (4 seconds)
      </Alert>
      <Button onClick={showAlert}>Submit</Button>
    </>
  )
}
