import './App.css';
import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from "./components/Home";

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
      loggedIn: false,
    };
  }

  componentDidMount() {
    this.handleLoginStatusChange();
  }

  handleLoginStatusChange() {
    this.setState({
      loggedIn: !!localStorage.getItem("doggytoken"),
    });
  }

  render() {
    return (
      <HashRouter>
        <Navbar
          loggedIn={this.state.loggedIn}
          onLoginChange={this.handleLoginStatusChange.bind(this)}
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
          <Route path="/swipecard" component={Swipecard}></Route>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
