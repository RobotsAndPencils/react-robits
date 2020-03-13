import React from 'react'

export const DropdownContext = React.createContext({
  toggle: () => {},
  open: false,
  direction: 'down',
  nav: false
})
