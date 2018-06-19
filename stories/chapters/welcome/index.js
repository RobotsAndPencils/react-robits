import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'

// pages
import Welcome from '../../pages/welcome/welcome'

storiesOf('Robits Storybook', module)
  .add('Welcome', () => {
    // keep. it triggers a knob listener
    const useStorybookTheme = boolean('Use Storybook Theme', window.useStorybookTheme)

    return <Welcome />
  })
