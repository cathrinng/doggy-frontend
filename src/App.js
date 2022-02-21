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
import Messages from "./components/Message";
import Feed from "./components/Feed";
import { getUsersById } from "./services/dogs";
import MessagesInput from "./components/MessageInput";
import Footer from "./components/Footer";

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
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.isLoggedIn !== prevState.isLoggedIn && !prevState.isLoggedIn == true) {

      const token = localStorage.getItem("doggytoken");
      const payload = jwtDecode(token);
      let loggedInUserInfo = await getUsersById(payload.id);
      this.setState({
        loggedInUserInfo,
      });
    }
  }

  handleLoginStatusChange() {
    this.setState({
      isLoggedIn: !!localStorage.getItem("doggytoken"),
    });
  }

  render() {
    return (
      <HashRouter>
        <Navbar
          loggedIn={this.state.isLoggedIn}
          onLoginChange={() => this.handleLoginStatusChange.bind(this)}
          loggedInUserInfo={this.state.loggedInUserInfo}
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
                loggedIn={this.state.isLoggedIn}
              />
            )}
          />
          <Route path="/swipecard" component={Swipecard}></Route>
          <Route
            path="/messages/:user_who_matched"
            component={Messages}
          ></Route>
          <Route path="/feed" component={Feed}></Route>
        </Switch>
        <Footer></Footer>
      </HashRouter>
    );
  }
}

export default App;
