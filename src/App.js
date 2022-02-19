import "./App.scss";
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
import Edit from "./components/Edit";
import Swipe from "./components/Swipe";
import Messages from "./components/Message";
import Feed from "./components/Feed";
import { getUsersById } from "./services/dogs";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      loggedInUserInfo: {},
    };
  }

  componentDidMount() {
    this.handleLoginStatusChange();
    this.updateUserInformation();
  }

  async updateUserInformation() {
    if (
      this.state.isLoggedIn &&
      Object.keys(this.state.loggedInUserInfo).length === 0
    ) {
      const token = localStorage.getItem("doggytoken");
      const payload = jwtDecode(token);
      let loggedInUserInfo = await getUsersById(payload.id);
      this.setState({
        loggedInUserInfo,
      });
      console.log(this.state.loggedInUserInfo);
    } else return;
  }

  handleLoginStatusChange() {
    this.setState({
      isLoggedIn: !!localStorage.getItem("doggytoken"),
    });
  }

  render() {
    if (
      this.state.isLoggedIn &&
      Object.keys(this.state.loggedInUserInfo).length === 0
    ) {this.updateUserInformation()}
    return (
      <HashRouter>
        <Navbar
          loggedIn={this.state.isLoggedIn}
          onLoginChange={() => this.handleLoginStatusChange.bind(this)}
          userInfo={this.state.userInfo}
        />
        <Switch>
          <Route path="/" exact component={Homepage}></Route>
          <Route path="/about" component={About}></Route>
          <Route
            path="/login"
            render={(routeProps) => (
              <Login
                {...routeProps}
                onLoginChange={this.handleLoginStatusChange.bind(this)}
              />
            )}
          />
          <Route
            path="/logout"
            render={(routeProps) => (
              <Logout
                {...routeProps}
                onLoginChange={this.handleLoginStatusChange.bind(this)}
              />
            )}
          />
          <Route
            path="/signup"
            render={(routeProps) => (
              <SignUp
                {...routeProps}
                onLoginChange={this.handleLoginStatusChange.bind(this)}
              />
            )}
          />
          <Route
            path="/edit"
            render={(routeProps) => (
              <Edit
                {...routeProps}
                onLoginChange={this.handleLoginStatusChange.bind(this)}
              />
            )}
          />
          <Route path="/swipecard" component={Swipecard}></Route>
          <Route path="/messages" component={Messages}></Route>
          <Route path="/swipe" component={Swipe}></Route>
          <Route path="/feed" component={Feed}></Route>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
