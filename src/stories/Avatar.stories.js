import React from 'react'
import { action } from '@storybook/addon-actions'
import { boolean, text } from '@storybook/addon-knobs'
import Avatar, { Avatar as AvatarComponent } from '../lib/components/avatar/Avatar'

export default {
  title: 'Robits/Avatar',
  component: AvatarComponent
}

export const Normal = ({ theme }) => {
  const componentKnobs = {
    squared: boolean('Squared', false),
    bordered: boolean('Bordered', false),
    withShadow: boolean('With Shadow', false),
    editable: boolean('Editable', false),
    transparent: boolean('Transparent', false),
    image: text('Image Source', 'https://www.robotsandpencils.com/assets/images/r&p.png')
  }

  return (
    <>
      <Avatar
        {...componentKnobs}
        size='sm'
        editCallback={componentKnobs.editable ? action('Clicked to edit') : undefined}
        theme={theme}>
        {text('Initials', 'RNP')}
      </Avatar>
      <Avatar
        {...componentKnobs}
        size='md'
        editCallback={componentKnobs.editable ? action('Clicked to edit') : undefined}
        theme={theme}>
        {text('Initials', 'RNP')}
      </Avatar>
      <Avatar
        {...componentKnobs}
        size='lg'
        editCallback={componentKnobs.editable ? action('Clicked to edit') : undefined}
        theme={theme}>
        {text('Initials', 'RNP')}
      </Avatar>
    </>
  )
}

Normal.story = {
  parameters: {
    knobs: {
      escapeHTML: false
    }
  }
}
