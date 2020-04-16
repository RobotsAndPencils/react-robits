import React from 'react'

const DropdownContext = React.createContext({
  toggle: () => {},
  open: false,
  direction: 'down',
  nav: false
})

export default DropdownContext
