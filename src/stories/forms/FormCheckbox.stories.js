import React from 'react'
import { boolean, select, text } from '@storybook/addon-knobs'
import FormCheckbox, { FormCheckbox as FormCheckboxComponent } from '../../lib/components/formCheckbox/FormCheckbox'

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
      <FormCheckbox id='story_check_1' {...componentKnobs} theme={theme}>Checkbox 1</FormCheckbox>
      <FormCheckbox id='story_check_2' {...componentKnobs} theme={theme}>Checkbox 2</FormCheckbox>
      <FormCheckbox id='story_check_3' {...componentKnobs} theme={theme}>Checkbox 3</FormCheckbox>
    </>
  )
}


// export const Sizes = ({ theme }) => {
//   let componentKnobs = {
//     disabled: boolean('Disabled', false),
//     validity: select('Validity', ['neutral', 'valid', 'invalid'], 'neutral'),
//     readonly: boolean('Read Only', false),
//     label: text('Label', ''),
//     hintContent: text('Hint Text', ''),
//     errorText: text('Error Text', 'There is an error'),
//     placeholder: text('Placeholder', ''),
//     required: boolean('Required', false),
//     rows: number('Rows', 7),
//     cols: number('Columns', 10)
//   }
//   componentKnobs = reconcileValidity(componentKnobs)

//   return (
//     <>
//       <FormCheckbox {...componentKnobs} theme={theme} placeholder="With Rows and Columns" />
//     </>
//   )
// }