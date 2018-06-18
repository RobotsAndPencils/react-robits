import React from 'react'
import {Field} from 'redux-form'
import { storiesOf } from '@storybook/react'
import colors from '../../../styles/_0colors.scss'
import ValidationFormContainer from '../../pages/forms/validationFormContainer'
import GenericFormContainer from '../../pages/forms/genericFormContainer'
import formStylesThemed from '../../pages/shared/theme/formStylesThemed.module.scss'

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

// import styles from '../../pages/forms/sampleFormStory.module.scss'

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
                    <Field theme={window.useStorybookTheme ? formStylesThemed : null} name='text_input' hintContent={hint} readonly={readonly} disabled={disabled} component={InputField} placeholder='Enter text ...' label='Basic Field' />
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
          let hint = text('Hint text', '')

          return (
            <StorybookPageLayout title='Basic Select Field'>
              <GenericFormContainer onSubmit={submitForm}>
                <div className='row'>
                  <div className='col-sm-6'>
                    <Field theme={window.useStorybookTheme ? formStylesThemed : null} name='select_input' hintContent={hint} disabled={disabled} component={SelectField} label='Select Field'>
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
          return (
            <StorybookPageLayout title='Checkboxes'>
              <GenericFormContainer onSubmit={submitForm}>
                <div className='row'>
                  <div className='col-sm-6'>
                    <Field name='checkbox_input' component={Checkbox} theme={window.useStorybookTheme ? formStylesThemed : null}>
                      Basic Checkbox Label
                    </Field>

                    <section>
                      <h3>Static examples</h3>
                      <div style={{maxWidth: '300px'}}>
                        <Field name='checkbox_input_long' component={Checkbox} theme={window.useStorybookTheme ? formStylesThemed : null}>
                          A Checkbox Label with a really long name that has to wrap to a second line
                        </Field>
                      </div>
                      <Field name='checkbox_input_withLink' component={Checkbox} clickableLabel={false} theme={window.useStorybookTheme ? formStylesThemed : null}>
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
          const defaultItems = ['Item one longer', 'Item two', 'Item three']
          const buttons = array('Radio Button Items', defaultItems, ',')
          let isStacked = boolean('isStacked', true)
          return (
            <StorybookPageLayout title='Radio Buttons'>
              <GenericFormContainer onSubmit={submitForm}>
                <div>
                  <div style={{marginBottom: '35px'}}>
                    <Field component={RadioGroup} theme={window.useStorybookTheme ? formStylesThemed : null} label='Radio Group Label' isStacked={isStacked} name='radio_input' buttons={buttons} />
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
                    <Field name='textarea_input' component={TextArea} readonly={readonly} disabled={disabled} hintContent={hint} theme={window.useStorybookTheme ? formStylesThemed : null} placeholder="This is optional. Tell us as much or as little as you'd like." label='Text Area' />
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
          return (
            <StorybookPageLayout title='Masked Input Field'>
              <GenericFormContainer onSubmit={submitForm}>
                <div className='row'>
                  <div className='col-sm-6'>
                    <Field name='masked_input' type='text' component={MaskedInputField} mask={text('Mask', '11/11/1111')} placeholder={text('Placeholder', 'MM / DD / YYYY')} label='Masked Input' theme={window.useStorybookTheme ? formStylesThemed : null} />
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
          return (
            <StorybookPageLayout title='Slider Input'>
              <GenericFormContainer onSubmit={submitForm}>
                <div className='row'>
                  <div className='col-sm-6'>
                    <Field name='slider_input' id='0' component={SliderField} label='Slider Label' minLabel='minimum' maxLabel='maximum' theme={window.useStorybookTheme ? formStylesThemed : null} />
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
          return (
            <StorybookPageLayout title='File Field'>
              <GenericFormContainer onSubmit={submitForm}>
                <div className='row'>
                  <div className='col-sm-6'>
                    <Field type='file' name='file_upload' component={FileField} label='File Upload Label' theme={window.useStorybookTheme ? formStylesThemed : null} />
                  </div>
                </div>
              </GenericFormContainer>
            </StorybookPageLayout>
          )
        }
      )
    )
  )

// storiesOf('Forms/Samples', module)
//   .add('Basic Validation',
//     withInfo('Basic usage:')(
//       withNotes('')(
//         CSSModules(() => {
//           return (
//             <StorybookPageLayout title='Basic Validation Example'>
//               <ValidationFormContainer onSubmit={submitForm}>
//                 <div>
//                   <div className='row'>
//                     <div className='col-sm-12'>
//                       <p className='paragraph-small'>* All fields are required</p>
//                     </div>
//                   </div>
//                   <div className='row'>
//                     <div className='col-sm-6'>
//                       <Field name='text_input' type='text' component={InputField} placeholder='Placeholder...' label='Normal Input' />
//                       <Field name='places_input' component={PlacesField} apiKey='AIzaSyC8xSDayoUhnpeyr1WAYHWaT8cKBuxXM2E' placeholder='Enter text ...' label='Places Field' />
//                       <Field name='hint_input' type='text' component={InputField} placeholder='Placeholder...' hintContent='1 letter, 1 number, 8 characters' label='Normal Input with a hint' />
//                       <Field name='masked_input' type='text' component={MaskedInputField} mask='11/11/1111' placeholder='MM / DD / YYYY' label='Masked Input' />
//                       <Field name='password_input' type='password' tooltipContent={passwordTooltipContent} component={InputField} placeholder='Password' label='With Tooltip' />
//                       <Field name='select_input' label='Select Input' component={SelectField}>
//                         <option hidden>Select ...</option>
//                         <option value='one'>One</option>
//                         <option value='two'>Two</option>
//                         <option value='three'>Three</option>
//                       </Field>
//                       <Field name='type_ahead' component={TypeAheadField} data={diagnoses} placeholder='Start typing...' label='Helpful Field' />
//                       <Field name='area_input' component={TextArea} placeholder="This is optional. Tell us as much or as little as you'd like." label='Text Area' />
//                       <Field name='date_input' component={DateInputField} showMonthDropdown showYearDropdown dropdownMode='select' placeholder='Date...' label='Date Input' />
//                       <Field name='checkbox_input' component={Checkbox}>
//                         Basic Checkbox Label
//                       </Field>
//                       <Field component={RadioGroup} stretch={false} name='radios_input' label='Default Radio Buttons' buttons={[{text: 'Item one', value: 0}, {text: 'Item two', value: 1}, {text: 'Item three', value: 2}]} />
//                       <div style={{margin: '0 0 20px 0'}}>
//                         <Field type='file' name='file_upload' component={FileField} label='Upload Your File' />
//                       </div>
//                       <Field name='drop_zone' component={DropZone} placeholder={dropZonePlaceholder} context={dropZoneContext} label='Upload Your File' />
//                       <div style={{marginTop: '20px'}}>
//                         <PrimaryButton
//                           type='submit'
//                           isLoading={false}
//                           disabled={false}>
//                           Submit
//                         </PrimaryButton>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </ValidationFormContainer>
//             </StorybookPageLayout>
//           )
//         }, styles, {allowMultiple: true})
//       )
//     )
//   )
