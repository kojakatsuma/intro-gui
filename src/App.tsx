import React from 'react';
import { MySelect } from './MySelect';
function App() {
  const options = [
    'Option 01',
    'Option 02',
    'Option 03',
    'Option 04',
    'Option 05',
  ]
  return (
    <div className="App">
      <MySelect options={options}/>
    </div>
  );
}

export default App;
