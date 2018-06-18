// import React from 'react'
// import { storiesOf } from '@storybook/react'
// import {Field} from 'redux-form/immutable'

// // addons
// import { action } from '@storybook/addon-actions'
// import { text, number, boolean, array, select } from '@storybook/addon-knobs'
// import { withNotes } from '@storybook/addon-notes'
// import { withInfo } from '@storybook/addon-info'
// import addonAPI from '@storybook/addons'

// // atoms
// import Truncate from '../../../lib/atoms/truncate/Truncate'
// import VideoPlayer from '../../../lib/atoms/videoPlayer/VideoPlayer'

// // pages
// import GenericFormContainer from '../../pages/forms/genericFormContainer'
// import StorybookPageLayout from '../../pages/shared/storybookPageLayout'

// storiesOf('Miscellaneous', module)
//   .add('Content Truncation',
//     withInfo('Basic usage of component:')(
//       withNotes('')(
//         () => {
//           let containerWidth = text('Container Width', '300px')
//           let lines = number('Number of Lines', 3)
//           let truncationContent = text('Content', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et consequat lectus, quis efficitur purus. Vivamus cursus tristique mi ut aliquam. Pellentesque eleifend pharetra risus sit amet condimentum. Fusce eu dui id libero iaculis faucibus at ut velit. Quisque enim lacus, venenatis iaculis lectus non, faucibus sagittis dui. Praesent in metus sapien. Vestibulum non tincidunt dolor. Phasellus ultrices ultricies tempus. Cras et tempus augue, a varius enim. Donec eu ipsum lacus.')

//           return (
//             <StorybookPageLayout title='Content Truncation'>
//               <div style={{width: containerWidth}}>
//                 <Truncate text={truncationContent} lines={lines} onToggle={() => action('Truncation')('Toggled')} />
//               </div>
//             </StorybookPageLayout>
//           )
//         }
//       )
//     )
//   )

// storiesOf('Miscellaneous', module)
//   .add('Video Player',
//     withInfo('Basic usage of component:')(
//       withNotes('')(
//         () => {
//           let videoSrc = text('Video URL', 'https://player.vimeo.com/video/222718012?title=0&byline=0&portrait=0')

//           return (
//             <StorybookPageLayout title='Video Player'>
//               <VideoPlayer url={videoSrc} />
//             </StorybookPageLayout>
//           )
//         }
//       )
//     )
//   )
