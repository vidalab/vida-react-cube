import React from 'react'
import './App.css'

import VidaComponent from 'vidajs'
import cubejs from "@cubejs-client/core"
import { QueryRenderer } from '@cubejs-client/react'

const cubejsApi = cubejs(process.env.REACT_APP_CUBEJS_TOKEN, {
  apiUrl: process.env.REACT_APP_API_URL
});

const renderVida = (resultSet) => {
  const vizJson = {
    "name": "Orders Example",
    "description": "Orders Example",
    "columns": 2,
    "rows": 2,
    "data": [
        {
          "name": "table",
          "values": resultSet.rawData()
        }
    ],
    "charts": [
      { "type": "line", "data": "table",
        "title": "Order Count",
        "position": {
          "columns": 1,
          "rows": 1,
          "x": 0,
          "y": 0
        },
        "axes": {
          "x": {
            "label": "month",
            "dataColumn": "Orders.createdAt.month",
            "dataType": "time",
            "dataFormat": "%Y-%m-%dT%H:%M:%S.%L",
            "displayFormat": "%b %d",
            "timePrecision": "month"
          },
          "y": {
            "label": "count",
            "dataColumns": [
              {"name": "Orders.count", "color": "#8884d8"},
            ]
          }
        }
      }
    ]
  }

  return (
    <div style={{width: "100%", height: "100%"}}>
      <VidaComponent vizData={vizJson} />
    </div>
  );
}

function App() {
  return (
    <div className="App" style={{width: "100%", height: "100%"}}>
      <div style={{width: "100%", height: "100%"}}>
        <QueryRenderer
            query={{
              measures: ["Orders.count"],
              timeDimensions: [
                {
                  dimension: "Orders.createdAt",
                  dateRange: ["2017-01-01", "2019-12-31"],
                  granularity: "month"
                }
              ]
            }}
            cubejsApi={cubejsApi}
            render={({ resultSet }) => {
              if (!resultSet) {
                return 'Loading...';
              }
              return renderVida(resultSet)
            }}
          />
      </div>
    </div>
  );
}

export default App;
