import React from "react";
import { Link } from 'react-router-dom'
import jwtDecode from "jwt-decode";

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      payload: {},
    }
  }

  componentDidMount() {
    const token = localStorage.getItem("doggytoken");
    const payload = jwtDecode(token);

    if (token) {
      this.setState({
        payload,
      });
    }
  }

  // goToLoginPage() {
  //   const { history } = this.props;
  //   history.replace('/login');
  // }

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