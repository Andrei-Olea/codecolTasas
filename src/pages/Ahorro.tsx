import SpreadsheetFetcher from '../components/SpreadsheetFetcher'

const Ahorro = () => {
    return (
        <div>
            <h2>Porfatolio Ahorro</h2>
            <div className='tabla-ahorro'>
                <h3>CDAT</h3>
                <SpreadsheetFetcher sheetName='CDAT' />
            </div>

            <div className='tabla-ahorro'>
                <h3>Ahorro Programado</h3>
                <SpreadsheetFetcher sheetName='Ahorro Programado' />
            </div>

            <div className='tabla-ahorro'>
                <h3>Cuentas De Ahorro</h3>
                <SpreadsheetFetcher sheetName='Cuentas Ahorro' />
            </div>
        </div>
    )
}

export default Ahorro