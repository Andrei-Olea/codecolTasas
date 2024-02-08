

import SpreadsheetFetcher from '../components/SpreadsheetFetcher'

function Credito() {

  return (
    <>
      <h2>Porfatolio Crédito</h2>
      <div className='tabla-credito'>
        <h3>Créditos Vivienda</h3>
        <SpreadsheetFetcher sheetName='Creditos Vivienda' />
      </div>

      <div className='tabla-credito'>
        <h3>Créditos Consumo</h3>
        <SpreadsheetFetcher sheetName='Creditos Consumo' />
      </div>

      <div className='tabla-credito'>
        <SpreadsheetFetcher sheetName='Tasas Mora' />
      </div>
    </>
  )
}

export default Credito
