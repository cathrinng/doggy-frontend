
import './App.css';
import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Test from './components/Messages';

function App() {
  return (
    <HashRouter>
      <h1>Who let the dogs out?</h1>

    <Switch>
      <Route path='/' exact component={Home}></Route>
      <Route path='/login' exact component={Login}></Route>
      <Route path="/signup" exact component={SignUp}></Route>
      <Route path='/messages' exact component={Test}></Route>
    </Switch>
    </HashRouter>
  );
}

export default App;
