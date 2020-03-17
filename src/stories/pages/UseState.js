import { useState } from 'react'

const UseState = ({ render, initialValue }) => {
  const [variable, setVariable] = useState(initialValue)
  return render(variable, setVariable)
}

export default UseState
