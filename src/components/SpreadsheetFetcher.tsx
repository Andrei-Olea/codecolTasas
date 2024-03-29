import { useEffect, useState } from 'react';

interface RowData {
  [key: string]: string | number | null;
}

interface TableData extends Array<RowData> { }

interface FetchResponse {
  table: {
    cols: { label: string }[];
    rows: { c: { v: string | number | null }[] }[];
  };
}

const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;

const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;

function SpreadsheetFetcher({ sheetName }: { sheetName: string }) {
  const [data, setData] = useState<TableData>([]);

  const query = encodeURIComponent('Select *');
  const encodedSheetName = encodeURIComponent(sheetName);
  const url = `${base}&sheet=${encodedSheetName}&tq=${query}`;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(url)
      .then(res => res.text())
      .then(rep => {
        const jsonData: FetchResponse = JSON.parse(rep.substring(47).slice(0, -2));
        const extractedData = jsonData.table.rows.map(row => {
          const rowData: RowData = {};
          row.c.forEach((cell, index) => {
            const columnName = jsonData.table.cols[index].label;
            if (columnName !== 'styles' && columnName.toLowerCase().includes('tasa')) {
              rowData[columnName] = cell?.v ? formatValue(cell.v) : '';
            } else {
              rowData[columnName] = cell?.v ? cell.v : null;
            }
          });
          return rowData;
        });
        setData(extractedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const formatValue = (value: string | number | null): string => {
    if (typeof value === 'number') {
      return value.toFixed(2);
    }
    return value !== null ? value.toString() : '';
  };

  const getRowClass = (rowData: RowData): string => {
    return rowData.styles ? rowData.styles.toString() : '';
  };

  return (
    <div className="output">
      <table>
        <thead>
          <tr>
            {Object.keys(data[0] || {}).filter(key => key !== 'styles').map(key => (
              <th key={key} className={getRowClass(data[0])}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <tr key={rowIndex} className={getRowClass(row)}>
              {Object.keys(row).filter(key => key !== 'styles').map((key, columnIndex) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <td key={columnIndex} colSpan={getRowClass(row) === 'subtitle' && columnIndex === 0 ? Object.keys(row).length - 1 : 1}>{row[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SpreadsheetFetcher;
