import React from 'react'

// This HOC wrappes every component in order to deliver either themed styles or default styles.
// All nested components will rely on the "styling" prop for CSS rules
export const wrapper = themes => WrappedComponent => {
  class ThemeWrapper extends React.Component {
    render () {
      const props = Object.assign({}, this.props, {
        styling: this.props.theme ? themes[`theme_${this.props.theme}`] : themes.theme_default
      })
      return (
        <>
          <WrappedComponent {...props} />
        </>
      )
    }
  }

  return ThemeWrapper
}

export default wrapper
