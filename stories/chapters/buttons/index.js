import React from 'react'
import { storiesOf } from '@storybook/react'

// addons
import { action } from '@storybook/addon-actions'
import { text, boolean } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withInfo } from '@storybook/addon-info'

// atoms
import PrimaryButton from '../../../lib/atoms/buttons/primaryButton/PrimaryButton'

// pages
import StorybookPageLayout from '../../pages/shared/storybookPageLayout'

// story assets
import styles from '../../pages/buttons/primaryButtonStory.module.scss'
import themedPrimaryButton from '../../pages/shared/theme/themedPrimaryButton.module.scss'

storiesOf('Buttons', module)
  .add('Primary Button',
    withInfo('Basic usage of component:')(
      withNotes('Notes go here...')(
        () => {
          // story knobs here...

          return (
            <StorybookPageLayout title='Primary Action Button'>
              <div className={styles['configurable-btn']}>
                <PrimaryButton
                  theme={window.useStorybookTheme ? themedPrimaryButton : null}
                  isLoading={boolean('isLoading', false)}
                  disabled={boolean('disabled', false)}
                  onClick={() => { action('Clicked')('testing') }}>
                  {text('Text', 'Primary Button')}
                </PrimaryButton>
              </div>
            </StorybookPageLayout>
          )
        }
      )
    )
  )
