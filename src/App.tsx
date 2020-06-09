import React from 'react'
import { MySelect } from './MySelect'
import { RingCommand } from './RingCommand'
function App() {
  const options = [
    'Option 01',
    'Option 02',
    'Option 03',
    'Option 04',
    'Option 05',
  ]

  const ringOptions = ['😀', '😄', '🤣', '😇', '🤩', '😚', '🤑']
  return (
    <>
      <div className="App">
        <MySelect options={options} />
      </div>
      <RingCommand options={ringOptions} />
    </>
  )
}

export default App
