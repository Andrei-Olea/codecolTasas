import React, { useEffect, useState } from 'react';

const sheetId = '1tpro_CKqYAtnCmY0OjjXWpt16aa3t-Zc28Tuxi4MMyE';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'Credito';
const query = encodeURIComponent('Select *');
const url = `${base}&sheet=${sheetName}&tq=${query}`;

function SpreadsheetFetcher() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(url)
      .then(res => res.text())
      .then(rep => {
        const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
        const colz = [];
        const extractedData = [];
        for (const heading of jsonData.table.cols) {
          if (heading.label) {
            colz.push(heading.label);
          }
        }
        for (const rowData of jsonData.table.rows) {
          const row = {};
          for (const [ind, ele] of colz.entries()) {
            row[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
          }
          extractedData.push(row);
        }
        setData(extractedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  return (
    <div className="output">
      <table>
        <thead>
          <tr>
            {Object.keys(data[0] || {}).map(key => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((value, columnIndex) => (
                <td key={columnIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SpreadsheetFetcher;
