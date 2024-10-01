import React, { useEffect, useState } from 'react';
import './App.css';

import { Chart } from 'react-charts';

import * as Actions from './Actions';
import ResizableBox from './ResizableBox';
import { IData } from './types';
import { Typography } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IData>([]);
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const response = await Actions.getData();
      if (response) {
        setData(response.reverse());
      }
      setLoading(false);
    };
    init();
  }, []);
  return (
    <div className="App">
      {loading && (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      )}
      <div className="header">
        <Typography variant="h3" component="h3" fontWeight={700}>
          Статистика
        </Typography>
        <Typography variant="h5" component="h5">
          Присвоєння почесного звання Героя України (посмертно) солдату 93
          окремої механізованої бригади "Холодний Яр" Яцуну Сергію Олеговичу,
          який загинув, мужньо захищаючи Україну та її народ
        </Typography>
      </div>

      {data.length > 0 && (
        <ResizableBox>
          <Chart
            options={{
              data: [
                {
                  label: 'Line',
                  data
                }
              ],
              primaryAxis: {
                getValue: (v: any) => v.date
              },
              secondaryAxes: [
                {
                  getValue: (v: any) => v.data.length
                }
              ]
            }}
          />
        </ResizableBox>
      )}
      <div style={{ margin: 20 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Дата</TableCell>
                <TableCell align="right">Кількість</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.date}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell align="right">{row.data.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default App;
