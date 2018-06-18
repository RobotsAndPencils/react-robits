// import React from 'react'
// import { storiesOf } from '@storybook/react'
// import colors from '../../../styles/_0colors.scss'
// import { number, select, boolean, text } from '@storybook/addon-knobs'
// import { withInfo } from '@storybook/addon-info'

// // pages
// import Icons from '../../pages/icons/icons'
// import StorybookPageLayout from '../../pages/shared/storybookPageLayout'
// import { sassColors } from '../../pages/shared/sassColors'

// // atoms
// import LoadingIndicator from '../../../lib/atoms/loadingIndicator/LoadingIndicator'
// import AppStoreIcon from '../../../lib/atoms/icons/AppStoreIcon'
// import GooglePlayIcon from '../../../lib/atoms/icons/GooglePlayIcon'

// storiesOf('Icons', module)
//   .add('Library', () => {
//     const widthOptions = {
//       range: true,
//       min: 1,
//       max: 70,
//       step: 1
//     }
//     const colorSelect = select('Color', sassColors, '#4A4A4A')
//     const width = number('Width', 24, widthOptions)
//     const isFilled = boolean('isFilled', false)

//     return (
//       <StorybookPageLayout title='Icon Library'>
//         <Icons fillColor={colorSelect} width={width} isFilled={isFilled} />
//       </StorybookPageLayout>
//     )
//   })

// storiesOf('Icons', module)
//   .add('Loading Indicator',
//     withInfo('Basic usage of component:')(
//       () => {
//         return (
//           <StorybookPageLayout title='Loading Indicator'>
//             <LoadingIndicator color={colors.x_light_gray_70} size={25} />
//             <p style={{margin: '20px 0 60px 0'}}>A small gray loader is used to indicate button level activity </p>
//             <LoadingIndicator color={colors.x_success} size={45} />
//             <p style={{margin: '20px 0 0 0'}}>A larger green loader is used to indicate page level activity </p>
//           </StorybookPageLayout>
//         )
//       }
//     )
//   )

// storiesOf('Icons', module)
//   .add('Mobile Store Icons',
//     withInfo('Basic usage of component:')(
//       () => {
//         let invertApple = boolean('Invert Apple Icon')
//         let invertGoogle = boolean('Invert Google Icon')
//         let appleUrl = text('Apple Url', 'https://itunes.apple.com/us/app/face-it-together/id1297058996?mt=8')
//         let googleUrl = text('Google Url', 'https://play.google.com/store/apps/details?id=com.welkin.android&hl=en')

//         return (
//           <StorybookPageLayout title='Mobile Store Icons'>
//             <AppStoreIcon invert={invertApple} url={appleUrl} />
//             <GooglePlayIcon invert={invertGoogle} url={googleUrl} />
//           </StorybookPageLayout>
//         )
//       }
//     )
//   )
