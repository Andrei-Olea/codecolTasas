import React, { useEffect, useState } from 'react';

const sheetId = '1tpro_CKqYAtnCmY0OjjXWpt16aa3t-Zc28Tuxi4MMyE';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;

function SpreadsheetFetcher({ sheetName }: { sheetName: string }) {
  const [data, setData] = useState([]);

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
        const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
        const extractedData = jsonData.table.rows.map(row => {
          const rowData = {};
          row.c.forEach((cell, index) => {
            const columnName = jsonData.table.cols[index].label;
            if (columnName !== 'styles') { // Exclude styles column
              rowData[columnName] = cell && cell.v ? formatValue(cell.v) : ''; // Extract and format cell value
            } else {
              rowData[columnName] = cell && cell.v ? cell.v : null; // Include styles column
            }
          });
          return rowData;
        });
        setData(extractedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  // Function to format numeric values with two decimal places if it has a decimal part
  const formatValue = (value) => {
    if (typeof value === 'number') {
      return Number.isInteger(value) ? value.toString() : value.toFixed(2);
    }
    return value;
  };

  const getRowClass = (rowData) => {
    return rowData.styles ? rowData.styles : '';
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
            <tr key={rowIndex} className={getRowClass(row)}>
              {Object.keys(row).filter(key => key !== 'styles').map((key, columnIndex) => (
                // Add colSpan attribute to the first cell if styles contain "subtitle"
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