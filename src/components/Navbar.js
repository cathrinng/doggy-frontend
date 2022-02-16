import React from "react";
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    }
  }
  componentDidMount() {
    this.props.onLoginChange();
  }

  render() {
    if(!this.props.loggedIn)  {
      return (
      <div className="public-navbar">
      <img src='#' className='logo-img'/>
      <Link to="/"><h1>Doggy</h1></Link>
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
        <Link to="/"><h1>Doggy</h1></Link>
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