import './App.css';
import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Home, Login } from "./components/Home";

function App() {
  return (
    <HashRouter>
      <h1>Who let the dogs out?</h1>
    <Switch>
      <Route path='/' exact component={Home}></Route>
      <Route path='/login' exact component={Login}></Route>
    </Switch>
    </HashRouter>
  );
}

export default App;
