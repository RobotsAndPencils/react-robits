import React, { useState, useEffect } from 'react'

// This HOC wraps every component in order to dynamically deliver the themed styles to the sub component.
// It works to resolve and provide a theme object prop called `styling` that all nested components will rely on for CSS rules
// By default all components will be themed according to the theme name string provided to a `REACT_APP_ROBITS_THEME` variable in the project `.env` file
// Additionally, each component can be themed individually by passing either a `themeName` or a `themeObj` prop.
// If `themeObj` is provided, it will take priority and be directly passed to the component as the `styling` prop for use.
// If `themeName` is provided, the string will be used in the construction of the path location provided by the component that is
// aimed to dynamically import a file in the `./src/core/components` directory, and that file's default export will be provided as the `styling` prop
export const wrapper = (getStylesFilePathForTheme = theme => theme) => WrappedComponent => {
  const ThemeWrapper = props => {
    const [styles, setStyles] = useState({ obj: null, ready: false })

    useEffect(() => {
      if (props.themeObj) {
        setStyles({
          obj: props.themeObj,
          ready: true
        })
      } else {
        import(
          `../components/${getStylesFilePathForTheme(
            props.themeName || process.env.REACT_APP_ROBITS_THEME
          )}`
        ).then(
          styles => {
            setStyles({
              obj: styles,
              ready: true
            })
          },
          () => {
            setStyles({
              ...styles,
              ...{ ready: true }
            })
          }
        )
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.themeObj, props.themeName])

    if (!styles.ready) return false

    return <WrappedComponent {...props} styling={styles.obj} />
  }

  return ThemeWrapper
}

export default wrapper
