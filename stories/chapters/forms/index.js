import React from 'react'
import {Field} from 'redux-form'
import { storiesOf } from '@storybook/react'
import colors from '../../../styles/_0colors.scss'
import ValidationFormContainer from '../../pages/forms/validationFormContainer'
import GenericFormContainer from '../../pages/forms/genericFormContainer'

// theming
import themedForm from '../../pages/shared/theme/themedForm.module.scss'
import themedCheckbox from '../../pages/shared/theme/themedCheckbox.module.scss'
import themedRadioGroup from '../../pages/shared/theme/themedRadioGroup.module.scss'
import themedSlider from '../../pages/shared/theme/themedSlider.module.scss'
import themedFileField from '../../pages/shared/theme/themedFileField.module.scss'
import themedSelect from '../../pages/shared/theme/themedSelect.module.scss'
import themedPrimaryButton from '../../pages/shared/theme/themedPrimaryButton.module.scss'

// addons
import { action } from '@storybook/addon-actions'
import { boolean, text, array, select } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withInfo } from '@storybook/addon-info'

// components
import InputField from '../../../lib/atoms/form/inputField/InputField'
import SelectField from '../../../lib/atoms/form/selectField/SelectField'
import Checkbox from '../../../lib/atoms/form/checkbox/Checkbox'
import RadioGroup from '../../../lib/atoms/form/radioGroup/RadioGroup'
import TextArea from '../../../lib/atoms/form/textArea/TextArea'
import MaskedInputField from '../../../lib/atoms/form/maskedInputField/MaskedInputField'
import SliderField from '../../../lib/atoms/form/sliderField/SliderField'
import FileField from '../../../lib/atoms/form/fileField/FileField'
import PrimaryButton from '../../../lib/atoms/buttons/primaryButton/PrimaryButton'

// pages
import StorybookPageLayout from '../../pages/shared/storybookPageLayout'

function submitForm (values) {
  action('Form Values')(values)
}

storiesOf('Forms/Input Types', module)
  .add('Input Field',
    withInfo('Basic usage of component:')(
      withNotes('')(
        () => {
          let readonly = boolean('Read-only', false)
          let disabled = boolean('Disabled', false)
          let hint = text('Hint text', '')

          return (
            <StorybookPageLayout title='Basic Input Field'>
              <GenericFormContainer onSubmit={submitForm}>
                <div className='row'>
                  <div className='col-sm-6'>
                    <Field theme={window.useStorybookTheme ? themedForm : null} name='text_input' hintContent={hint} readonly={readonly} disabled={disabled} component={InputField} placeholder='Enter text ...' label='Basic Field' />
                  </div>
                </div>
              </GenericFormContainer>
            </StorybookPageLayout>
          )
        }
      )
    )
  )

storiesOf('Forms/Input Types', module)
  .add('Select Field',
    withInfo('Basic usage of component:')(
      withNotes('')(
        () => {
          let disabled = boolean('Disabled', false)
          let readonly = boolean('Read-only', false)
          let hint = text('Hint text', '')

          return (
            <StorybookPageLayout title='Basic Select Field'>
              <GenericFormContainer onSubmit={submitForm}>
                <div className='row'>
                  <div className='col-sm-6'>
                    <Field
                      theme={window.useStorybookTheme ? themedSelect : null}
                      name='select_input'
                      hintContent={hint}
                      disabled={disabled}
                      component={SelectField}
                      readonly={readonly}
                      label='Select Field'>
                      <option hidden>Select ...</option>
                      <option value='one'>One</option>
                      <option value='two'>Two</option>
                      <option value='three'>Three</option>
                    </Field>
                  </div>
                </div>
              </GenericFormContainer>
            </StorybookPageLayout>
          )
        }
      )
    )
  )

storiesOf('Forms/Input Types', module)
  .add('Checkbox',
    withInfo('Basic usage of component:')(
      withNotes('')(
        () => {
          let disabled = boolean('Disabled', false)
          let readonly = boolean('Read-only', false)

          return (
            <StorybookPageLayout title='Checkboxes'>
              <GenericFormContainer onSubmit={submitForm}>
                <div className='row'>
                  <div className='col-sm-6'>
                    <Field name='checkbox_input' component={Checkbox} theme={window.useStorybookTheme ? themedCheckbox : null} disabled={disabled} readonly={readonly}>
                      Basic Checkbox Label
                    </Field>

                    <section>
                      <h3>Static examples</h3>
                      <div style={{maxWidth: '300px'}}>
                        <Field name='checkbox_input_long' component={Checkbox} theme={window.useStorybookTheme ? themedCheckbox : null}>
                          A Checkbox Label with a really long name that has to wrap to a second line
                        </Field>
                      </div>
                      <Field name='checkbox_input_withLink' component={Checkbox} clickableLabel={false} theme={window.useStorybookTheme ? themedCheckbox : null}>
                        Checkbox Label with&nbsp;
                        <a href='#'>
                          Link Tag
                        </a>
                      </Field>
                    </section>
                  </div>
                </div>
              </GenericFormContainer>
            </StorybookPageLayout>
          )
        }
      )
    )
  )

storiesOf('Forms/Input Types', module)
  .add('Radio Buttons',
    withInfo('Basic usage of component:')(
      withNotes('')(
        () => {
          let disabled = boolean('Disabled', false)
          let readonly = boolean('Read-only', false)
          const defaultItems = ['Item one longer', 'Item two', 'Item three']
          const buttons = array('Radio Button Items', defaultItems, ',')
          let isStacked = boolean('isStacked', true)
          return (
            <StorybookPageLayout title='Radio Buttons'>
              <GenericFormContainer onSubmit={submitForm}>
                <div>
                  <div style={{marginBottom: '35px'}}>
                    <Field
                      component={RadioGroup}
                      theme={window.useStorybookTheme ? themedRadioGroup : null}
                      label='Radio Group Label'
                      isStacked={isStacked}
                      name='radio_input'
                      disabled={disabled}
                      readonly={readonly}
                      buttons={buttons} />
                  </div>
                </div>
              </GenericFormContainer>
            </StorybookPageLayout>
          )
        }
      )
    )
  )

storiesOf('Forms/Input Types', module)
  .add('Text Area',
    withInfo('Basic usage of component:')(
      withNotes('')(
        () => {
          let readonly = boolean('Read-only', false)
          let disabled = boolean('Disabled', false)
          let hint = text('Hint text', '')

          return (
            <StorybookPageLayout title='Radio Buttons'>
              <GenericFormContainer onSubmit={submitForm}>
                <div>
                  <div style={{marginBottom: '35px'}}>
                    <Field name='textarea_input' component={TextArea} readonly={readonly} disabled={disabled} hintContent={hint} theme={window.useStorybookTheme ? themedForm : null} placeholder="This is optional. Tell us as much or as little as you'd like." label='Text Area' />
                  </div>
                </div>
              </GenericFormContainer>
            </StorybookPageLayout>
          )
        }
      )
    )
  )

storiesOf('Forms/Input Types', module)
  .add('Masked Input',
    withInfo('Basic usage of component:')(
      withNotes('')(
        () => {
          let readonly = boolean('Read-only', false)
          let disabled = boolean('Disabled', false)

          return (
            <StorybookPageLayout title='Masked Input Field'>
              <GenericFormContainer onSubmit={submitForm}>
                <div className='row'>
                  <div className='col-sm-6'>
                    <Field
                      name='masked_input'
                      type='text'
                      disabled={disabled}
                      readonly={readonly}
                      component={MaskedInputField}
                      mask={text('Mask', '11/11/1111')}
                      placeholder={text('Placeholder', 'MM / DD / YYYY')}
                      label='Masked Input'
                      theme={window.useStorybookTheme ? themedForm : null} />
                  </div>
                </div>
              </GenericFormContainer>
            </StorybookPageLayout>
          )
        }
      )
    )
  )

storiesOf('Forms/Input Types', module)
  .add('Slider Field',
    withInfo('Basic usage of component:')(
      withNotes('')(
        () => {
          let readonly = boolean('Read-only', false)
          let disabled = boolean('Disabled', false)

          return (
            <StorybookPageLayout title='Slider Input'>
              <GenericFormContainer onSubmit={submitForm}>
                <div className='row'>
                  <div className='col-sm-6'>
                    <Field
                      name='slider_input'
                      id='0'
                      component={SliderField}
                      label='Slider Label'
                      minLabel='minimum'
                      maxLabel='maximum'
                      readonly={readonly}
                      disabled={disabled}
                      theme={window.useStorybookTheme ? themedSlider : null} />
                  </div>
                </div>
              </GenericFormContainer>
            </StorybookPageLayout>
          )
        }
      )
    )
  )

storiesOf('Forms/Input Types', module)
  .add('File Field',
    withInfo('Basic usage of component:')(
      withNotes('')(
        () => {
          let disabled = boolean('Disabled', false)

          return (
            <StorybookPageLayout title='File Field'>
              <GenericFormContainer onSubmit={submitForm}>
                <div className='row'>
                  <div className='col-sm-6'>
                    <Field type='file' disabled={disabled} name='file_upload' component={FileField} label='File Upload Label' theme={window.useStorybookTheme ? themedFileField : null} />
                  </div>
                </div>
              </GenericFormContainer>
            </StorybookPageLayout>
          )
        }
      )
    )
  )

const required = value => (value ? undefined : 'Required')
const requiredDirty = (value, allValues, props) => {
  return (value ? undefined : 'Required')
}

storiesOf('Forms/Samples', module)
  .add('Basic Validation',
    withInfo('Basic usage:')(
      withNotes('')(
        () => {
          return (
            <StorybookPageLayout title='Basic Validation Example'>
              <ValidationFormContainer onSubmit={submitForm}>
                <div>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <p className='paragraph-small'>* All fields are required</p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-sm-6'>
                      <Field validate={required} name='text_input' type='text' component={InputField} placeholder='Placeholder...' label='Normal Input' theme={window.useStorybookTheme ? themedForm : null} />
                      <Field validate={required} name='masked_input' type='text' component={MaskedInputField} mask='11/11/1111' placeholder='MM / DD / YYYY' label='Masked Input' theme={window.useStorybookTheme ? themedForm : null} />
                      <Field validate={required} name='select_input' label='Select Input' component={SelectField} theme={window.useStorybookTheme ? themedSelect : null}>
                        <option hidden>Select ...</option>
                        <option value='one'>One</option>
                        <option value='two'>Two</option>
                        <option value='three'>Three</option>
                      </Field>
                      <Field validate={required} name='textarea_input' component={TextArea} placeholder="This is optional. Tell us as much or as little as you'd like." label='Text Area' theme={window.useStorybookTheme ? themedForm : null} />
                      <Field validate={required} name='checkbox_input' component={Checkbox} theme={window.useStorybookTheme ? themedCheckbox : null}>
                        Basic Checkbox Label
                      </Field>
                      <Field validate={requiredDirty}
                        name='slider_input'
                        id='0'
                        component={SliderField}
                        label='Slider Label'
                        minLabel='minimum'
                        maxLabel='maximum'
                        theme={window.useStorybookTheme ? themedSlider : null} />
                      <Field validate={required} component={RadioGroup} stretch={false} name='radios_input' label='Default Radio Buttons' buttons={[{text: 'Item one', value: 0}, {text: 'Item two', value: 1}, {text: 'Item three', value: 2}]} theme={window.useStorybookTheme ? themedRadioGroup : null} />
                      <Field validate={required} type='file' name='file_upload' component={FileField} label='Upload Your File' theme={window.useStorybookTheme ? themedFileField : null} />
                      <PrimaryButton
                        type='submit'
                        isLoading={false}
                        disabled={false}
                        theme={window.useStorybookTheme ? themedPrimaryButton : null}>
                        Submit
                      </PrimaryButton>
                    </div>
                  </div>
                </div>
              </ValidationFormContainer>
            </StorybookPageLayout>
          )
        }
      )
    )
  )
