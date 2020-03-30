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
      <Alert
        id='primary-example'
        open={visible}
        {...componentKnobs}
        theme={theme}
        styleType='primary'>
        Hello Alert
      </Alert>
      <Alert
        id='secondary-example'
        open={visible}
        {...componentKnobs}
        theme={theme}
        styleType='secondary'>
        Hello Alert
      </Alert>
      <Alert
        id='success-example'
        open={visible}
        {...componentKnobs}
        theme={theme}
        styleType='success'>
        Hello Alert
      </Alert>
      <Alert id='info-example' open={visible} {...componentKnobs} theme={theme} styleType='info'>
        Hello Alert
      </Alert>
      <Alert
        id='warning-example'
        open={visible}
        {...componentKnobs}
        theme={theme}
        styleType='warning'>
        Hello Alert
      </Alert>
      <Alert
        id='danger-example'
        open={visible}
        {...componentKnobs}
        theme={theme}
        styleType='danger'>
        Hello Alert
      </Alert>
      <Alert id='light-example' open={visible} {...componentKnobs} theme={theme} styleType='light'>
        Hello Alert
      </Alert>
      <Alert id='dark-example' open={visible} {...componentKnobs} theme={theme} styleType='dark'>
        Hello Alert
      </Alert>
    </>
  )
}

export const SelfDismissing = ({ theme }) => {
  const [visible, setVisible] = useState(false)

  const showAlert = () => {
    setVisible(true)
  }

  return (
    <>
      <Alert
        id='auto-dismiss-example'
        open={visible}
        theme={theme}
        autoDismissDelay={4000}
        removeHandler={id => console.log('removing', id)}
        styleType='success'>
        Your request was successful! (4 seconds)
      </Alert>
      <Button onClick={showAlert}>Submit</Button>
    </>
  )
}
