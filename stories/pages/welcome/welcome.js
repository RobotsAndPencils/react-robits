import React from 'react'
import styles from './welcome.module.scss'

const Welcome = () => {
  return (
    <div className={styles['welcome']}>
      <div className={styles['inner']}>
        <img src='/robits.png' width='500' alt='React Robits' />
        <h1>Welcome to Robots & Pencils' Robits</h1>
        <p>This is a React UI component development environment for core and shared components throughout various projects.</p>
        <p>This page was built using <a href='https://storybook.js.org/' target='_blank'>React Storybook</a></p>
      </div>
    </div>
  )
}

export default Welcome
