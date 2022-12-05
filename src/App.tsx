import React from 'react';
import logo from './logo.svg';
import './App.css';
import Resume from './pages/Resume/Resume';

function App() {
  return (<>
    <img src={logo} className="App-logo" alt="logo" />
    <Resume/>
  </>
  );
}

export default App;
