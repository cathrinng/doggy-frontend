import "./App.css";
import React, { Component } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";

import Homepage from "./components/Homepage";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Swipecard from "./components/Swipecard";
import Logout from "./components/Logout";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    };
  }

  handleLoginStatusChange() {
    this.setState({
      isLoggedIn: !!localStorage.getItem("Doggytoken"),
    });
  }

  // componentDidMount() {
  //   const token = localStorage.getItem("doggytoken");
  //   const payload = jwtDecode(token);

  //   if (token) {
  //     this.setState({
  //       payload,
  //       isLoggedIn: true,
  //     });
  //   }
  // }

  render() {
    return (
      <HashRouter>
        <Navbar loggedIn={this.state.isLoggedIn} />
        <Switch>
          <Route path="/" exact component={Homepage}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/signup" component={SignUp}></Route>
          <Route
            payload={this.state.payload}
            path="/swipecard"
            component={Swipecard}
          ></Route>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
