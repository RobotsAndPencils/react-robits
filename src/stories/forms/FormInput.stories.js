import React from 'react'
import { boolean, select, text } from '@storybook/addon-knobs'
import FormInput, { FormInput as FormInputComponent } from '../../lib/components/formInput/FormInput'

const reconcileValidity = (componentKnobs) => {
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
  title: 'Robits/Form/FormInput',
  component: FormInputComponent
}

export const Normal = ({ theme }) => {
  let componentKnobs = {
    disabled: boolean('Disabled', false),
    validity: select('Validity', ['neutral', 'valid', 'invalid'], 'neutral'),
    readonly: boolean('Read Only', false),
    label: text('Label', ''),
    hintContent: text('Hint Text', ''),
    errorText: text('Error Text', 'There is an error'),
    placeholder: text('Placeholder', ''),
    required: boolean('Required', false)
  }
  componentKnobs = reconcileValidity(componentKnobs)

  return (
    <>
      <FormInput {...componentKnobs} theme={theme} />
    </>
  )
}

export const Sizes = ({ theme }) => {
  let componentKnobs = {
    disabled: boolean('Disabled', false),
    validity: select('Validity', ['neutral', 'valid', 'invalid'], 'neutral'),
    readonly: boolean('Read Only', false),
    label: text('Label', ''),
    hintContent: text('Hint Text', ''),
    errorText: text('Error Text', 'There is an error'),
    placeholder: text('Placeholder', ''),
    required: boolean('Required', false)
  }
  componentKnobs = reconcileValidity(componentKnobs)

  return (
    <>
      <FormInput {...componentKnobs} size='lg' theme={theme} placeholder='Large' />
      <FormInput {...componentKnobs} theme={theme} placeholder='Normal' />
      <FormInput {...componentKnobs} size='sm' theme={theme} placeholder='Small' />
    </>
  )
}
