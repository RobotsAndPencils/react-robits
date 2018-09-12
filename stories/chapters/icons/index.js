import React from 'react'
import { storiesOf } from '@storybook/react'
import { number, select, boolean } from '@storybook/addon-knobs'

// pages
import Icons from '../../pages/icons/icons'
import StorybookPageLayout from '../../pages/shared/storybookPageLayout'
import { sassColors } from '../../pages/shared/sassColors'

storiesOf('Icons', module)
  .add('Library', () => {
    const widthOptions = {
      range: true,
      min: 1,
      max: 70,
      step: 1
    }
    const colorSelect = select('Color', sassColors, '#000000')
    const width = number('Width', 24, widthOptions)
    const isFilled = boolean('isFilled', false)

    return (
      <StorybookPageLayout title='Icon Library'>
        <Icons fillColor={colorSelect} width={width} isFilled={isFilled} />
      </StorybookPageLayout>
    )
  })
