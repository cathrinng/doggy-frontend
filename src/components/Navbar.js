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
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }
  componentDidMount() {
    this.props.onLoginChange();
  }

  toggleDropdown() {
    switch(this.state.displayDropdown) {
      case true:
       this.setState({
         displayDropdown: false,
       }); 
       break;
       case false:
         this.setState({
           displayDropdown: true,
      }); 
      break;
    }}

  render() {
    console.log(this.state.displayDropdown);
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
          <button className={this.state.displayDropdown ? "menu active" : "menu"} onClick={this.toggleDropdown}><img src="/"></img></button>
            {this.state.displayDropdown ? (
            <ul>
              <li className="swipcard-option" onClick={this.toggleDropdown}><Link to="/swipecard">Swipecards</Link></li>
              <li className="profile-option" onClick={this.toggleDropdown}><Link to="/edit">Edit profile</Link></li>
              <li className="preferences-option" onClick={this.toggleDropdown}><Link to="/preferences">Edit preferences</Link></li>
              <li className="logout-option" onClick={this.toggleDropdown}><Link to="/logout">Log out</Link></li>
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