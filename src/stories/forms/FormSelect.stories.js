import React from 'react'
import { boolean, select, text } from '@storybook/addon-knobs'
import FormSelect, {
  FormSelect as FormSelectComponent
} from '../../lib/components/formSelect/FormSelect'

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
  title: 'Robits/Form/FormSelect',
  component: FormSelectComponent
}

export const Normal = ({ themeName }) => {
  let componentKnobs = {
    disabled: boolean('Disabled', false),
    validity: select('Validity', ['neutral', 'valid', 'invalid'], 'neutral'),
    readonly: boolean('Read Only', false),
    label: text('Label', ''),
    hintContent: text('Hint Text', ''),
    errorText: text('Error Text', 'There is an error'),
    required: boolean('Required', false),
    size: select('Size', ['sm', 'md', 'lg'], 'md')
  }
  componentKnobs = reconcileValidity(componentKnobs)

  return (
    <>
      <FormSelect {...componentKnobs} themeName={themeName}>
        <option value='one'>One</option>
        <option value='two'>Two</option>
        <option value='three'>Three</option>
      </FormSelect>
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
    required: boolean('Required', false)
  }
  componentKnobs = reconcileValidity(componentKnobs)

  return (
    <>
      <FormSelect {...componentKnobs} size='lg' themeName={themeName}>
        <option value='one'>One</option>
        <option value='two'>Two</option>
        <option value='three'>Three</option>
      </FormSelect>
      <FormSelect {...componentKnobs} themeName={themeName}>
        <option value='one'>One</option>
        <option value='two'>Two</option>
        <option value='three'>Three</option>
      </FormSelect>
      <FormSelect {...componentKnobs} size='sm' themeName={themeName}>
        <option value='one'>One</option>
        <option value='two'>Two</option>
        <option value='three'>Three</option>
      </FormSelect>
    </>
  )
}
