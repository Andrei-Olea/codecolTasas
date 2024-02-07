

import SpreadsheetFetcher from '../components/SpreadsheetFetcher'

function Credito() {

  return (
    <>
      <h2>Porfatolio Credito</h2>
      <div className='tabla-credito'>
        <h3>Creditos Vivienda</h3>
        <SpreadsheetFetcher sheetName='Creditos Vivienda' />
      </div>

      <div className='tabla-credito'>
        <h3>Creditos Consumo</h3>
        <SpreadsheetFetcher sheetName='Creditos Consumo' />
      </div>
    </>
  )
}

export default Credito
