import React from 'react'
import { boolean, select, text, color } from '@storybook/addon-knobs'
import FormCheckbox, {
  FormCheckbox as FormCheckboxComponent
} from '../../lib/components/formCheckbox/FormCheckbox'
import colors from '../../lib/styles/themes/default/themeColors.module.scss'

const reconcileValidity = componentKnobs => {
  const validityStyles = {
    valid: false,
    invalid: false
  }

  if (componentKnobs.validity !== 'neutral') {
    validityStyles[componentKnobs.validity] = true
  }

  delete componentKnobs.validity
  return Object.assign({}, componentKnobs, validityStyles)
}

export default {
  title: 'Robits/Form/FormCheckbox',
  component: FormCheckboxComponent
}

export const Normal = ({ theme }) => {
  let componentKnobs = {
    toggle: boolean('As Toggle', false),
    disabled: boolean('Disabled', false),
    validity: select('Validity', ['neutral', 'valid', 'invalid'], 'neutral'),
    errorText: text('Error Text', 'There is an error'),
    required: boolean('Required', false),
    inline: boolean('Inline', false),
    small: boolean('Small', false)
  }
  componentKnobs = reconcileValidity(componentKnobs)

  return (
    <>
      <label>Options:</label>
      <FormCheckbox id='story_check_1' {...componentKnobs} theme={theme}>
        Checkbox 1
      </FormCheckbox>
      <FormCheckbox id='story_check_2' {...componentKnobs} theme={theme}>
        Checkbox 2
      </FormCheckbox>
      <FormCheckbox id='story_check_3' {...componentKnobs} theme={theme}>
        Checkbox 3
      </FormCheckbox>
    </>
  )
}

const colorKeys = Object.keys(colors).map(key => key.replace('x_', ''))
colorKeys.unshift('none')
export const Toggles = ({ theme }) => {
  let componentKnobs = {
    disabled: boolean('Disabled', false),
    validity: select('Validity', ['neutral', 'valid', 'invalid'], 'neutral'),
    errorText: text('Error Text', 'There is an error'),
    required: boolean('Required', false),
    inline: boolean('Inline', false),
    small: boolean('Small', false),
    leftColor: select('Left Color', colorKeys, 'none'),
    leftLabel: text('Left Label', '')
  }
  componentKnobs = reconcileValidity(componentKnobs)

  if (componentKnobs.leftColor === 'none') {
    delete componentKnobs.leftColor
  }

  return (
    <>
      <label>Options:</label>
      <FormCheckbox id='story_check_1' toggle {...componentKnobs} theme={theme}>
        Checkbox 1
      </FormCheckbox>
      <FormCheckbox id='story_check_2' toggle {...componentKnobs} theme={theme}>
        Checkbox 2
      </FormCheckbox>
      <FormCheckbox id='story_check_3' toggle {...componentKnobs} theme={theme}>
        Checkbox 3
      </FormCheckbox>
    </>
  )
}
