import logo from './logo.svg';
import './App.css';
import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from "./components/Home";

function App() {
  return (
    <HashRouter>
      <h1>Who let the dogs out?</h1>
    <Switch>
      <Route path='/' exact component={Home}></Route>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    </Switch>
    </HashRouter>
  );
}

export default App;
