import React from 'react';
import { useState } from 'react'
import './App.css'
import QRCodeGenerator from './components/qrgenerator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <QRCodeGenerator/>
    </>
  )
}

export default App
