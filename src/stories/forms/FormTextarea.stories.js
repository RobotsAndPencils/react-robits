import React from 'react'
import { boolean, select, text, number } from '@storybook/addon-knobs'
import FormTextarea, {
  FormTextarea as FormTextareaComponent
} from '../../lib/components/formTextarea/FormTextarea'

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
  title: 'Robits/Form/FormTextarea',
  component: FormTextareaComponent
}

export const Normal = ({ themeName }) => {
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
      <FormTextarea {...componentKnobs} themeName={themeName} />
    </>
  )
}

export const Sizes = ({ themeName }) => {
  let componentKnobs = {
    disabled: boolean('Disabled', false),
    validity: select('Validity', ['neutral', 'valid', 'invalid'], 'neutral'),
    readonly: boolean('Read Only', false),
    label: text('Label', ''),
    hintContent: text('Hint Text', ''),
    errorText: text('Error Text', 'There is an error'),
    placeholder: text('Placeholder', ''),
    required: boolean('Required', false),
    rows: number('Rows', 7),
    cols: number('Columns', 10)
  }
  componentKnobs = reconcileValidity(componentKnobs)

  return (
    <>
      <FormTextarea {...componentKnobs} themeName={themeName} placeholder='With Rows and Columns' />
    </>
  )
}
