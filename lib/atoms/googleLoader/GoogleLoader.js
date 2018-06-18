import React from 'react'
import ScriptCache from './ScriptCache'
import GoogleApi from './GoogleApi'

export const wrapper = (options) => (WrappedComponent) => {
  const libraries = (options && options.libraries) ? options.libraries : ['places']

  class GoogleWrapper extends React.Component {
    constructor (props, context) {
      super(props, context)

      this.state = {
        loaded: false,
        map: null,
        google: null
      }
    }

    componentDidMount () {
      this.scriptCache.google.onLoad((err, tag) => {
        this.setState({
          loaded: true,
          google: window.google
        })
      })
    }

    componentWillMount () {
      this.scriptCache = ScriptCache({
        google: GoogleApi({
          apiKey: this.props.apiKey,
          libraries: libraries
        })
      })
    }

    render () {
      const props = Object.assign({}, this.props, {
        loaded: this.state.loaded,
        google: this.state.google
      })
      return (
        <div>
          <WrappedComponent {...props} />
        </div>
      )
    }
  }

  return GoogleWrapper
}

export default wrapper
