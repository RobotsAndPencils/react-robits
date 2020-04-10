import React from 'react'
import { useState } from '@storybook/client-api'
import { boolean } from '@storybook/addon-knobs'
import Alert, { Alert as AlertComponent } from '../lib/components/alert/Alert'
import Button from '../lib/components/button/Button'

export default {
  title: 'Robits/Alert',
  component: AlertComponent
}

const remove = () => {
  console.log('removing / cleanup')
}

export const Normal = ({ themeName }) => {
  const componentKnobs = {
    centered: boolean('Centered', true),
    dismissible: boolean('Dismissible', false),
    open: boolean('Open', true)
  }

  return (
    <>
      <Alert
        themeName={themeName}
        id='primary-example'
        removeHandler={remove}
        {...componentKnobs}
        styleType='primary'>
        Hello Alert
      </Alert>
      <Alert
        id='secondary-example'
        removeHandler={remove}
        {...componentKnobs}
        themeName={themeName}
        styleType='secondary'>
        Hello Alert
      </Alert>
      <Alert
        id='success-example'
        removeHandler={remove}
        {...componentKnobs}
        themeName={themeName}
        styleType='success'>
        Hello Alert
      </Alert>
      <Alert
        id='info-example'
        removeHandler={remove}
        {...componentKnobs}
        themeName={themeName}
        styleType='info'>
        Hello Alert
      </Alert>
      <Alert
        id='warning-example'
        removeHandler={remove}
        {...componentKnobs}
        themeName={themeName}
        styleType='warning'>
        Hello Alert
      </Alert>
      <Alert
        id='danger-example'
        removeHandler={remove}
        {...componentKnobs}
        themeName={themeName}
        styleType='danger'>
        Hello Alert
      </Alert>
      <Alert
        id='light-example'
        removeHandler={remove}
        {...componentKnobs}
        themeName={themeName}
        styleType='light'>
        Hello Alert
      </Alert>
      <Alert
        id='dark-example'
        removeHandler={remove}
        {...componentKnobs}
        themeName={themeName}
        styleType='dark'>
        Hello Alert
      </Alert>
    </>
  )
}

export const SelfDismissing = ({ themeName }) => {
  const [visible, setVisible] = useState(false)

  const showAlert = () => {
    setVisible(true)
  }

  return (
    <>
      <Alert
        id='auto-dismiss-example'
        open={visible}
        themeName={themeName}
        autoDismissDelay={4000}
        removeHandler={id => console.log('removing', id)}
        styleType='success'>
        Your request was successful! (4 seconds)
      </Alert>
      <Button themeName={themeName} onClick={showAlert}>
        Submit
      </Button>
    </>
  )
}
