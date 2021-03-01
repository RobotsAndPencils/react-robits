import { isFunction } from 'lodash'

const reflow = node => {
  void node.offsetHeight // eslint-disable-line
}

const getNodeHeight = node => {
  return node.scrollHeight
}

const isBrowser = !!(typeof window !== 'undefined' && window.document)

const isRef = target => {
  if (target && typeof target === 'object') {
    return 'current' in target
  }

  return false
}

const getDOMElements = target => {
  if (isFunction(target)) {
    return target()
  }

  if (isRef(target)) {
    return target.current
  }

  if (!isBrowser && typeof target !== 'string') {
    return target
  }

  const results = document.querySelectorAll(target)

  if (!results.length) {
    throw new Error(`No DOM elements were found for ${target}.`)
  }

  return results
}

const getTarget = target => {
  const results = getDOMElements(target)

  return results.length ? results[0] : results
}

export default {
  reflow,
  getNodeHeight,
  getTarget,
  getDOMElements,
  isRef,
  isBrowser
}
