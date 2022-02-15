
import './App.css';
import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import Homepage from "./components/Homepage";
import About from "./components/About";
import Navbar from './components/Navbar';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Swipecard from "./components/Swipecard";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      payload: {},
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('doggytoken');
    const payload = jwtDecode(token);

    if (token) {
      this.setState({
      payload,
      isLoggedIn: true,
      })
    }
  }

  render() {
  return (
    <HashRouter>
    <Navbar loggedIn={this.state.isLoggedIn}/>
    <Switch>
      <Route path='/' exact component={Homepage}></Route>
      <Route path='/about' component={About}></Route>
      <Route path='/login' exact component={Login}></Route>
      <Route path="/signup" exact component={SignUp}></Route>
      <Route path="/swipecard" exact component={Swipecard}></Route>
    </Switch>
    </HashRouter>
    );
  }
}

export default App;
