import React from 'react'
import PropTypes from 'prop-types'
import storybookTheme from './storybookTheme.module.scss'

// this wraps the entire storybook to listen for and provide theming on the whole

class ThemeProvider extends React.Component {
  componentDidMount () {
    window.addEventListener('useStorybookThemeChanged', () => {
      this.forceUpdate()
    })
  }

  render () {
    return (
      <div className={`${(window.useStorybookTheme) ? 'use-storybook-theme' : ''}`}>
        {this.props.children}
      </div>
    )
  }
}

ThemeProvider.propTypes = {
  children: PropTypes.any.isRequired
}

export default ThemeProvider
