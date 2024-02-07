import { useState } from 'react'
import '../styles/App.css'

import SpreadsheetFetcher from '../components/SpreadsheetFetcher'

function Credito() {

  return (
    <>
      <h1>Tasas Credito</h1>
      <SpreadsheetFetcher />
    </>
  )
}

export default Credito
