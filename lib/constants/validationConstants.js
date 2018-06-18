import _ from 'lodash'
import moment from 'moment'

const isValidEmail = (value) => !!(value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
const isNumber = (value) => !_.isNaN(value) && _.isNumber(value)

/**
 * Checks if a string is a valid currency amount.
 * 
 * Valid amounts examples:
 *   - .57
 *   - 0.57
 *   - 0
 *   - 12
 * 
 * @param {string} value The string to check
 * @return {boolean} `true` if the string contains only digits and decimal separator, false otherwise.
 */
const isValidCurrencyAmount = (value) => value.match(/^(0?|\d+)(\.\d+)?$/)

/**
 * Checks if a string is a valid integer.
 * 
 * @param {string} value The string to check
 * @return {boolean} `true` if the string is a valid integer, false otherwise.
 */
const isValidInteger = (value) => value.match(/^(0|[1-9]\d*)$/)

// Checks whether a given date is a real date.
const isValidDate = (value) => {
  const tokens = value.split('/')
  const sysTime = new Date()
  let isValid = tokens.length === 3
  let message = ''
  if (tokens.length === 3) {
    const date = `${tokens[2]}-${tokens[0]}-${tokens[1]}`
    const momentDate = moment(date)
    const isValidDate = momentDate.isValid()
    if (!isValidDate) {
      isValid = false
      message = `Invalid Date`
      return {
        isValid,
        message
      }
    }
    // Check for date in the future
    if (sysTime.getTime() - new Date(tokens[2], tokens[0] - 1, tokens[1]).getTime() < 0) {
      isValid = false
      message = 'Invalid Date'
      return {
        isValid,
        message
      }
    }
  } else {
    isValid = false
    message = 'Invalid Date'
  }
  return {
    isValid,
    message
  }
}

// Checks whether a given range of dates is valid, assuming that the individual dates themselves are valid.
const isValidDateRange = (start, end) => moment(start).isSameOrBefore(end)

export default {
  isValidEmail,
  isNumber,
  isValidDate,
  isValidDateRange,
  isValidCurrencyAmount,
  isValidInteger
}
