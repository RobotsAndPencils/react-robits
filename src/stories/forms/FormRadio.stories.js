import React from 'react'
import { boolean, select, text } from '@storybook/addon-knobs'
import FormRadio, {
  FormRadio as FormRadioComponent
} from '../../core/components/formRadio/FormRadio'

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

const radioOptions = [
  { label: 'Radio 1', value: 'one' },
  { label: 'Radio 2', value: 'two' },
  { label: 'Radio 3', value: 'three' }
]

export default {
  title: 'Robits/Form/FormRadio',
  component: FormRadioComponent
}

export const Normal = ({ themeName }) => {
  let componentKnobs = {
    label: text('Label', ''),
    hintContent: text('Hint Text', ''),
    disabled: boolean('Disabled', false),
    validity: select('Validity', ['neutral', 'valid', 'invalid'], 'neutral'),
    errorText: text('Error Text', 'There is an error'),
    required: boolean('Required', false),
    inline: boolean('Inline', false)
  }
  componentKnobs = reconcileValidity(componentKnobs)

  return (
    <>
      <FormRadio
        {...componentKnobs}
        name='story-radio'
        options={radioOptions}
        themeName={themeName}
      />
    </>
  )
}
