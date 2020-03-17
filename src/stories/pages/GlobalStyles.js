import React, { useEffect } from 'react'
import ThemeWrapper from '../../lib/utils/ThemeWrapper'
import * as themes from './globalThemes'

export const GlobalStyles = ({ styling }) => {
  useEffect(() => {
    styling.use()
    return () => {
      styling.unuse()
    }
  }, [styling])

  return <div />
}

export default ThemeWrapper(themes)(GlobalStyles)
