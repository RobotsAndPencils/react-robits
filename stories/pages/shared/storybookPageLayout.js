import React from 'react'
import PropTypes from 'prop-types'
import styles from './storybookPageLayout.module.scss'
import { boolean } from '@storybook/addon-knobs'

const StorybookPageLayout = ({children, title, fullbleed}) => {
  const useStorybookTheme = boolean('Use Storybook Theme', window.useStorybookTheme)

  return (
    <div className={`${styles['container']} ${fullbleed ? styles['full-bleed'] : ''}`}>
      <h1 className={styles['header']}>{title}</h1>
      {children}
    </div>
  )
}

StorybookPageLayout.defaultProps = {
  fullbleed: false
}

StorybookPageLayout.propTypes = {
  children: PropTypes.any.isRequired,
  title: PropTypes.string
}

export default StorybookPageLayout
