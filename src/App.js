import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import TelaInicio from './components/TelaInicio';
import Score from './components/Score';
import Ranking from './components/Ranking';
import Questions from './components/Questions';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Switch>
          <Route exact path="/" component={TelaInicio} />
          <Route path="/score" component={Score} />
          <Route path="/ranking" component={Ranking} />
          <Route path="/questions" component={Questions} />
        </Switch>
      </header>
    </div>
  );
}
