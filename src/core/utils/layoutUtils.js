const reflow = node => {
  void node.offsetHeight // eslint-disable-line
}

const getNodeHeight = node => {
  return node.scrollHeight
}

export default {
  reflow,
  getNodeHeight
}
