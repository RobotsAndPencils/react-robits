import React from 'react'
import ThemeWrapper from '../../lib/utils/ThemeWrapper'
import * as themes from './globalThemes'

export const GlobalStyles = ({ styling }) => {
  return <div />
}

export default ThemeWrapper(themes)(GlobalStyles)
