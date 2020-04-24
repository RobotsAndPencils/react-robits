import React, { useState, useEffect } from 'react'

const GlobalStyles = props => {
  const [isReady, setReady] = useState(false)

  useEffect(() => {
    import(`../../core/styles/themes/${props.themeName}/global.module.scss`).then(styles => {
      setReady(true)
    })
  }, [props.themeName])

  if (!isReady) return false
  return <div />
}

export default GlobalStyles
