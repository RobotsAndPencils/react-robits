import React from 'react'
import { useCallback } from '@storybook/client-api'
import { boolean, select, text } from '@storybook/addon-knobs'
import FormAutocomplete, {
  FormAutocomplete as FormAutocompleteComponent
} from '../../lib/components/formAutocomplete/FormAutocomplete'
import { states } from '../pages/testData'
import FormInputAddon from '../../lib/components/formInput/FormInputAddon'

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
  title: 'Robits/Form/FormAutocomplete',
  component: FormAutocompleteComponent
}

export const Normal = ({ themeName }) => {
  const handleSelection = useCallback(selection => {
    console.log('selection made', selection)
  }, [])

  let componentKnobs = {
    disabled: boolean('Disabled', false),
    validity: select('Validity', ['neutral', 'valid', 'invalid'], 'neutral'),
    label: text('Label', ''),
    hintContent: text('Hint Text', ''),
    errorText: text('Error Text', 'There is an error'),
    placeholder: text('Placeholder', ''),
    required: boolean('Required', false),
    multiple: boolean('Multiple', true),
    forceMatch: boolean('Force a match', false),
    allowNew: boolean('Allow new tokens', true),
    size: select('Size', ['sm', 'md', 'lg'], 'md')
  }
  componentKnobs = reconcileValidity(componentKnobs)

  return (
    <>
      <FormAutocomplete
        {...componentKnobs}
        labelKey='name'
        onChange={handleSelection}
        themeName={themeName}
        options={states}
      />
    </>
  )
}

export const Addons = ({ themeName }) => {
  let componentKnobs = {
    disabled: boolean('Disabled', false),
    validity: select('Validity', ['neutral', 'valid', 'invalid'], 'neutral'),
    label: text('Label', ''),
    hintContent: text('Hint Text', ''),
    errorText: text('Error Text', 'There is an error'),
    placeholder: text('Placeholder', ''),
    required: boolean('Required', false)
  }
  componentKnobs = reconcileValidity(componentKnobs)

  componentKnobs.options = states
  componentKnobs.labelKey = 'name'

  return (
    <>
      <FormAutocomplete
        id='autocomplete-example-1'
        {...componentKnobs}
        themeName={themeName}
        placeholder='Prepender'>
        <FormInputAddon type='prepend' themeName={themeName}>
          $
        </FormInputAddon>
      </FormAutocomplete>
      <br />
      <FormAutocomplete
        id='autocomplete-example-2'
        {...componentKnobs}
        themeName={themeName}
        placeholder='Appender'>
        <FormInputAddon type='append' themeName={themeName}>
          $
        </FormInputAddon>
      </FormAutocomplete>
      <br />
      <FormAutocomplete
        id='autocomplete-example-3'
        {...componentKnobs}
        themeName={themeName}
        placeholder='Both'>
        <FormInputAddon type='prepend' themeName={themeName}>
          $
        </FormInputAddon>
        <FormInputAddon type='append' themeName={themeName}>
          .00
        </FormInputAddon>
      </FormAutocomplete>
      <br />
      <FormAutocomplete
        id='autocomplete-example-4'
        {...componentKnobs}
        themeName={themeName}
        placeholder='Leading'>
        <FormInputAddon type='leading' themeName={themeName}>
          <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            x='0px'
            y='0px'
            viewBox='0 0 32 32'
            width='16'
            height='auto'>
            <path
              d='M31.6,31.7c-0.2,0.2-0.5,0.3-0.7,0.3s-0.5-0.1-0.7-0.3L19.7,21.2C17.6,22.9,14.9,24,12,24C5.4,24,0,18.6,0,12
              C0,5.4,5.4,0,12,0s12,5.4,12,12c0,2.9-1.1,5.6-2.8,7.7l10.5,10.6C32,30.7,32,31.3,31.6,31.7z M21.9,12c0-5.5-4.5-10-10-10
              S2,6.5,2,12s4.5,10,10,10C17.5,22,21.9,17.5,21.9,12z'
            />
          </svg>
        </FormInputAddon>
      </FormAutocomplete>
      <br />
      <FormAutocomplete
        id='autocomplete-example-5'
        {...componentKnobs}
        themeName={themeName}
        placeholder='Leading'>
        <FormInputAddon type='trailing' themeName={themeName}>
          <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='auto'
            viewBox='0 0 32 32'>
            <path d='M16 32c-8.822 0-16-7.177-16-16 0-8.822 7.178-16 16-16s16 7.178 16 16c0 8.823-7.178 16-16 16zM16 2c-7.72 0-14 6.28-14 14s6.28 14 14 14 14-6.281 14-14c0-7.72-6.28-14-14-14zM16 25c-0.26 0-0.521-0.11-0.71-0.29-0.181-0.19-0.29-0.45-0.29-0.71s0.109-0.52 0.29-0.71c0.37-0.37 1.050-0.37 1.42 0 0.18 0.19 0.29 0.45 0.29 0.71s-0.11 0.52-0.29 0.71c-0.191 0.18-0.45 0.29-0.71 0.29zM16 21c-0.553 0-1-0.447-1-1v-12c0-0.553 0.447-0.999 1-0.999s1 0.446 1 0.999v12c0 0.553-0.447 1-1 1z' />
          </svg>
        </FormInputAddon>
      </FormAutocomplete>
    </>
  )
}
