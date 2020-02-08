import React from 'react'
import { boolean, select, text } from '@storybook/addon-knobs'
import FormTextarea, { FormTextarea as FormTextareaComponent } from '../../lib/components/formTextarea/FormTextarea'

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
  title: 'Robits/Form/FormTextarea',
  component: FormTextareaComponent
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
    required: boolean('Required', false),
    resizeable: boolean('Resizeable', true)
  }
  componentKnobs = reconcileValidity(componentKnobs)

  return (
    <>
      <FormTextarea {...componentKnobs} theme={theme} />
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
      <FormTextarea {...componentKnobs} theme={theme} placeholder="Normal" />
      <FormTextarea {...componentKnobs} theme={theme} placeholder="With Rows" rows="10" />
    </>
  )
}