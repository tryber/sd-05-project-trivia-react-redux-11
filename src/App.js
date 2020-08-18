import React from 'react';
import logo from './trivia.png';
import './App.css';
import TelaInicio from './components/TelaInicio';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TelaInicio />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>

      </header>
    </div>
  );
}
