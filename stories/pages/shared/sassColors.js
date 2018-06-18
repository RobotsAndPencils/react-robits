import colors from '../../../styles/_0colors.scss'

function toSass (json) {
  let ret = {}
  for (let key in json) {
    ret[json[key]] = key.replace(/x_/g, '$').replace(/_/g, '-')
  }
  return ret
}

export const sassColors = toSass(colors)
