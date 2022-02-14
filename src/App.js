import "./App.css";
import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";

function App() {
  return (
    <HashRouter>
      <h1>Who let the dogs out?</h1>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/signup" exact component={SignUp}></Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
