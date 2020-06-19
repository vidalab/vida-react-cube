import React from 'react';
import './App.css';

import vizJson from './viz.json'
import VidaComponent from 'vidajs'

function App() {
  return (
    <div className="App" style={{width: "100%", height: "100%"}}>
      <div style={{width: "100%", height: "100%"}}>
        <VidaComponent vizData={vizJson} />
      </div>
    </div>
  );
}

export default App;
