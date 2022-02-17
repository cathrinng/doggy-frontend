import React from "react";
import { Link } from 'react-router-dom';
import { ReactDropdownProps } from "react-dropdown";

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      displayDropdown: false,
    }
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
  }
  componentDidMount() {
    this.props.onLoginChange();
  }

  showDropdown(event) {
    event.preventDefault();
    this.setState({
      displayDropdown: true,
    })
    }
  
  hideDropdown() {
    this.setState({
      displayDropdown: false,
    })
  }

  render() {
    if(!this.props.loggedIn)  {
      return (
      <div className="public-navbar">
        <img src='#' className='logo-img'/>
        <Link to="/"><h1>Doggy</h1></Link>
        <Link to="/login"
        className="login-button">Register/Login</Link>
      </div>
      )
    }

    else {
      return (
        <div className="private-navbar">
          <img src='#' className='logo-img'/>
          <Link to="/"><h1>Doggy</h1></Link>          
          <div className="dropdown-button" onClick={this.showDropdown}><img src="/"></img></div>
          {this.state.displayDropdown ? (
            <ul>
              <li className="swipcard-option"><Link to="/swipecards" onClick={this.hideDropdown}>Matching page</Link></li>
              <li className="profile-option"><Link to="/edit" onClick={this.hideDropdown}>Edit profile</Link></li>
              <li className="preferences-option"><Link to="/preferences" onClick={this.hideDropdown}>Edit preferences</Link></li>
              <li className="logout-option"><Link to="/logout" onClick={this.hideDropdown}>Log out</Link></li>
            </ul>
          ) : (
            null
          )
          }
      </div>
      )
    }
  }
}

export default Navbar;