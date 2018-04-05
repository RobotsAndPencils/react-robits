import React from 'react'
import PropTypes from 'prop-types'
/**
 * Basic Input Component with Error and Warning display for redux-form 7
 * Everything but 'styles' comes from `<Field/>` in redux-form 7.
 * 
 * @param {any} {
 *   input,
 *   label,
 *   type,
 *   disabled,
 *   meta: { touched, error, warning },
 *   styles
 * } 
 * @returns 
 */
function Input ({
  input,
  label,
  type,
  disabled,
  meta: { touched, error, warning },
  styles
}) {
  return (
    <div>
      <input {...input} disabled={disabled} placeholder={label} type={type} />
      {touched &&
        ((error && <div className={styles.error}>{error}</div>) ||
          (warning && <div className={styles.warning}>{warning}</div>))}
    </div>
  )
}

Input.propTypes = {
  styles: PropTypes.shape({
    error: PropTypes.string
    warning: PropTypes.string
  })
}

export default Input