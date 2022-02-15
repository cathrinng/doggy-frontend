import React from "react";
import { Link } from 'react-router-dom'


class Navbar extends React.Component {
  goToLoginPage() {
    const { history } = this.props;
    history.replace('/login');
  }

  render() {
    if(!this.props.loggedIn)  {
      return (
      <div className="public-navbar">
      <img src='#' className='logo-img'/>
      <h1>Doggy</h1>
      <Link to="/login"
      className="login-button">
      Register/Login</Link>
      </div>
      )
    }

    else {
      return (
        <div className="private-navbar">
        <img src='#' className='logo-img'/>
        <h1>Doggy</h1>
        <img src='#'/>
        <Link to="/logout"
        className="logout-link">
        Logout</Link>
      </div>
      )
    }
  }
}

export default Navbar;