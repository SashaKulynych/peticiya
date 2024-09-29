import React, { useEffect, useMemo, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { AxisOptions, Chart } from 'react-charts';

import * as Actions from './Actions';
import ResizableBox from './ResizableBox';

type IData = {
  date: string;
  data: {
    number: string;
    name: string;
    date: string;
  }[];
}[];

function App() {
  const [data, setData] = useState<IData>(
    require('./Actions/data.json').reverse()
  );
  useEffect(() => {
    const arr: IData = [];
    let pageNumber = 1;
    const init = async () => {
      const response = await Actions.getData({
        petitionId: 234334,
        pageNumber
      });
      if (response) {
        const parser = new DOMParser();
        const dom = parser.parseFromString(response.table_html, 'text/html');
        const tableExist = dom.querySelector('.table_row');
        if (tableExist) {
          const elements = dom.querySelectorAll('.table_row');
          elements.forEach((element) => {
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
              arr[i].data.push(newItem);
            } else {
              arr.push({
                date,
                data: [newItem]
              });
            }
          });
          pageNumber++;
          init();
        } else {
          setData(arr.reverse());
          console.log({ arr });
        }
      }
    };
    init();
  }, []);
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
