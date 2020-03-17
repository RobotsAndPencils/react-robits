import React from 'react'
import { boolean, text, number, select } from '@storybook/addon-knobs'
import ProgressBar, {
  ProgressBar as ProgressBarComponent
} from '../lib/components/progressBar/ProgressBar'

export default {
  title: 'Robits/ProgressBar',
  component: ProgressBarComponent
}

export const Normal = ({ theme }) => {
  const componentKnobs = {
    striped: boolean('Striped', false),
    animated: boolean('Animated', false),
    withValue: boolean('With Value', false),
    label: text('Label', ''),
    value: number('Value', 50),
    barColor: select('Bar Color', ['primary', 'secondary', 'success', 'warning'], 'primary')
  }

  return (
    <>
      <ProgressBar {...componentKnobs} theme={theme}>
        {componentKnobs.withValue ? componentKnobs.value : null}
      </ProgressBar>
    </>
  )
}

export const Sizes = ({ theme }) => {
  const componentKnobs = {
    striped: boolean('Striped', false),
    animated: boolean('Animated', false),
    withValue: boolean('With Value', false),
    value: number('Value', 50),
    barColor: select('Bar Color', ['primary', 'secondary', 'success', 'warning'], 'primary')
  }

  return (
    <>
      <ProgressBar {...componentKnobs} label='Large' size='lg' theme={theme}>
        {componentKnobs.withValue ? componentKnobs.value : null}
      </ProgressBar>
      <ProgressBar {...componentKnobs} label='Normal' theme={theme}>
        {componentKnobs.withValue ? componentKnobs.value : null}
      </ProgressBar>
      <ProgressBar {...componentKnobs} label='Small' size='sm' theme={theme}>
        {componentKnobs.withValue ? componentKnobs.value : null}
      </ProgressBar>
    </>
  )
}

export const Multiples = ({ theme }) => {
  const parentKnobs = {
    striped: boolean('Striped', false),
    animated: boolean('Animated', false),
    withValue: boolean('With Value', false)
  }

  const firstKnobs = {
    value: number('First Value', 30),
    barColor: select('First Bar Color', ['primary', 'secondary', 'success', 'warning'], 'primary')
  }

  const secondKnobs = {
    value: number('Second Value', 25),
    barColor: select(
      'Second Bar Color',
      ['primary', 'secondary', 'success', 'warning'],
      'secondary'
    )
  }

  const thirdKnobs = {
    value: number('Third Value', 10),
    barColor: select('Third Bar Color', ['primary', 'secondary', 'success', 'warning'], 'warning')
  }

  return (
    <>
      <ProgressBar multi theme={theme}>
        <ProgressBar {...parentKnobs} {...firstKnobs} bar theme={theme}>
          {parentKnobs.withValue ? firstKnobs.value : null}
        </ProgressBar>
        <ProgressBar {...parentKnobs} {...secondKnobs} bar theme={theme}>
          {parentKnobs.withValue ? secondKnobs.value : null}
        </ProgressBar>
        <ProgressBar {...parentKnobs} {...thirdKnobs} bar theme={theme}>
          {parentKnobs.withValue ? thirdKnobs.value : null}
        </ProgressBar>
      </ProgressBar>
    </>
  )
}
