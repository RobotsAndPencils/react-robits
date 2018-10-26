import React from 'react'
import { storiesOf } from '@storybook/react'

// addons
import { action } from '@storybook/addon-actions'
import { text, number } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withInfo } from '@storybook/addon-info'

// atoms
import Truncate from '../../../lib/atoms/truncate/Truncate'
import VideoPlayer from '../../../lib/atoms/videoPlayer/VideoPlayer'

// pages
import StorybookPageLayout from '../../pages/shared/storybookPageLayout'

// story assets
import themedTruncation from '../../pages/shared/theme/themedTruncation.module.scss'

storiesOf('Miscellaneous', module)
  .add('Content Truncation',
    withInfo('Basic usage of component:')(
      withNotes('')(
        () => {
          let containerWidth = text('Container Width', '300px')
          let lines = number('Number of Lines', 3)
          let truncationContent = text('Content', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et consequat lectus, quis efficitur purus. Vivamus cursus tristique mi ut aliquam. Pellentesque eleifend pharetra risus sit amet condimentum. Fusce eu dui id libero iaculis faucibus at ut velit. Quisque enim lacus, venenatis iaculis lectus non, faucibus sagittis dui. Praesent in metus sapien. Vestibulum non tincidunt dolor. Phasellus ultrices ultricies tempus. Cras et tempus augue, a varius enim. Donec eu ipsum lacus.')

          return (
            <StorybookPageLayout title='Content Truncation'>
              <div style={{width: containerWidth}}>
                <Truncate
                  theme={window.useStorybookTheme ? themedTruncation : null}
                  text={truncationContent}
                  lines={lines}
                  onToggle={() => action('Truncation')('Toggled')} />
              </div>
            </StorybookPageLayout>
          )
        }
      )
    )
  )

storiesOf('Miscellaneous', module)
  .add('Video Player',
    withInfo('Basic usage of component:')(
      withNotes('')(
        () => {
          let videoSrc = text('Video URL', 'https://www.youtube.com/watch?v=yVZUyARqwYY')

          return (
            <StorybookPageLayout title='Video Player'>
              <VideoPlayer url={videoSrc} />
            </StorybookPageLayout>
          )
        }
      )
    )
  )
