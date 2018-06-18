import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import ThemeProvider from '../stories/pages/shared/ThemeProvider'
import RootWrapper from '../stories/pages/shared/root'
import { setOptions } from '@storybook/addon-options'
import addonAPI from '@storybook/addons'

import backgrounds from '@storybook/addon-backgrounds'

window.useStorybookTheme = false

// decorate every incoming story
addDecorator(story => {
  const backgroundColorsDefaultWhite = [
    { name: 'White', value: '#FFFFFF', default: true },
    { name: 'Black', value: '#000000' }
  ];

  return backgrounds(backgroundColorsDefaultWhite)(story)
})

addDecorator(withKnobs)

addDecorator(story => {
  addonAPI.getChannel().addListener('addon:knobs:knobChange', (knobObj) => {
    if (knobObj.name === 'Use Storybook Theme') {
      window.useStorybookTheme = knobObj.value
      window.dispatchEvent(new Event('useStorybookThemeChanged'))
    }
  })
  return (
    <ThemeProvider>
      <RootWrapper>
        {story()}
      </RootWrapper>
    </ThemeProvider>
  )
})

setOptions({
  name: 'R&P React Robits',
  url: 'https://github.com/RobotsAndPencils/react-robits'
})

// find stories
const req = require.context('../stories/chapters', true, /index.js$/)

// sort the found files
var presetOrder = ['./welcome/index.js']
function sortSpecial (arr) {
  var result = []
  var i
  for (i = 0; i < presetOrder.length; i++) {
    var j = arr.indexOf(presetOrder[i])
    if (j !== -1) {
      result.push(arr.splice(j, 1)[0])
    }
  }
  return result.concat(arr)
}
var sortedKeys = sortSpecial(req.keys())

// dynamically load the stories
function loadStories () {
  sortedKeys.forEach((filename) => req(filename))
}

configure(loadStories, module)
