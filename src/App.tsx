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

const cachedData = require('./Actions/data.json') as IData;

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IData>([...cachedData].reverse());
  useEffect(() => {
    const arr: IData = [...cachedData];
    let pageNumber = 1;
    setLoading(true);
    const onFinish = () => {
      setData(arr.reverse());
      setLoading(false);
    };
    const init = async () => {
      const response = await Actions.getData({
        petitionId: 234334,
        pageNumber
      });
      if (response) {
        const parser = new DOMParser();
        const dom = parser.parseFromString(response.table_html, 'text/html');
        let finish = false;
        const tableExist = dom.querySelector('.table_row');
        if (tableExist) {
          const elements = dom.querySelectorAll('.table_row');
          for (let index = 0; index <= elements.length; index++) {
            const element = elements[index];
            if (element) {
              const number = element.querySelector('.number')?.innerHTML || '';
              const name = element.querySelector('.name')?.innerHTML || '';
              const date = element.querySelector('.date')?.innerHTML || '';
              const newItem = {
                number,
                name,
                date
              };
              const i = arr.findIndex((v) => v.date === date);
              if (i !== -1) {
                const alreadyExist = arr[i].data.find(
                  (v) => v.name === newItem.name
                );
                if (alreadyExist) {
                  finish = true;
                } else {
                  arr[i].data.push(newItem);
                }
              } else {
                arr.unshift({
                  date,
                  data: [newItem]
                });
              }
            }
          }
          if (finish) {
            onFinish();
          } else {
            pageNumber++;
            init();
          }
        } else {
          onFinish();
        }
      }
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
