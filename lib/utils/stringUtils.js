// @flow
/**
 * Formats a string consisting of digits as a phone number of format +1 (xxx) yyy-zzzz,
 * with the international calling code +1 only included if the phone number already includes it.
 * Can only handle strings of 10+ digits long; will return the unmodified string otherwise.
 */
const formatPhoneNumber = function (phone: string): string {
  phone = phone && phone.replace(/\D/g, '')
  if (phone.length < 10) {
    console.warn(`This phone number is missing digits. 
    Please reach out to the appropriate person for the correct phone number.`)
    return phone
  }
  const internationalAccessCode = phone.charAt(0) === '1' ? '+1 ' : ''
  const domesticPhoneNumber = internationalAccessCode.length > 0 ? phone.substring(1) : phone
  const areaCode = domesticPhoneNumber.substring(0, 3)
  const centralOfficeCode = domesticPhoneNumber.substring(3, 6)
  const subscriberNumber = domesticPhoneNumber.substring(6, 10)
  const extension = domesticPhoneNumber.length > 10 ? ' ext. ' + domesticPhoneNumber.substring(10) : ''

  return `${internationalAccessCode}(${areaCode}) ${centralOfficeCode}-${subscriberNumber}${extension}`
}

export default {
  formatPhoneNumber
}
