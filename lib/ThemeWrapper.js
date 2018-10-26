import React from 'react'

// This HOC wrappes every component in order to deliver either themed styles or default styles.
// All nested components will rely on the "styling" prop for CSS rules
export const wrapper = (options) => (WrappedComponent) => {
  const defaultStyles = options.defaultStyles

  class ThemeWrapper extends React.Component {
    render () {
      const props = Object.assign({}, this.props, {
        styling: this.props.theme ? this.props.theme : defaultStyles
      })
      return (
        <div>
          <WrappedComponent {...props} />
        </div>
      )
    }
  }

  return ThemeWrapper
}

export default wrapper
