import React from 'react'
import './App.css'
import Form from './components/Form/Form';

function App () {
  return (
    <div className="App">
      <header className="App-header">
        <Form />
      </header>
      <svg id='graphContainer'></svg>
    </div>
  )
}

export default App
