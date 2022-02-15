import React from "react";


class Navbar extends React.Component {
  render() {
    if(!this.props.loggedIn)  {
      return (
      <div className="public-navbar">
      <img src='#' className='logo-img'/>
      <h1>Doggy</h1>
      <button 
      className="login-button"
      // onClick={this.handleLoginAttempt.bind(this)}
      >Register/Login
      </button>
      </div>
      )
    }

    else {
      return (
        <div>
        <img src='#' className='logo-img'/>
        <h1>Doggy</h1>
        <img src='#'
        className='profile-img'
        // onClick={logout}
        />Logout
      </div>
      )
    }
  }
}

export default Navbar;