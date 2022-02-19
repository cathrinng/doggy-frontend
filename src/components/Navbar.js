import React from "react";
import { Link } from "react-router-dom";
import { ReactDropdownProps } from "react-dropdown";
import logo from "../logo.png";
import { isThisYear } from "date-fns/esm";
import jwtDecode from "jwt-decode";
import { getUsersById } from "../services/dogs";

// Icons
import { CgLogOut } from "react-icons/cg";
import { BsGear, BsHeart } from "react-icons/bs";

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      displayDropdown: false,
      loggedInUserInfo: {},
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }
  componentDidMount() {
    this.props.onLoginChange();
    this.updateUserInformation();
  }

  toggleDropdown() {
    switch (this.state.displayDropdown) {
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
    }
  }

  async updateUserInformation() {
    if (Object.keys(this.state.loggedInUserInfo).length === 0) {
      const token = localStorage.getItem("doggytoken");
      const payload = jwtDecode(token);
      let loggedInUserInfo = await getUsersById(payload.id);
      this.setState({
        loggedInUserInfo,
      });
      console.log(this.state.loggedInUserInfo);
    } else return;
  }

  render() {
    if (!this.props.loggedIn) {
      return (
        <div className="navbar public-navbar">
          <Link to="/">
            <div className="logo">
              <img src={logo} className="logo-img" />
              <h1>Doggy</h1>
            </div>
          </Link>
          <Link to="/login" className="login-button">
            Register/Login
          </Link>
        </div>
      );
    } else {
      return (
        <div className="navbar private-navbar">
          <Link to="/">
            <div className="logo">
              <img src={logo} className="logo-img" />
              <h1>Doggy</h1>
            </div>
          </Link>

          <div className="dropdown-menu">
            <img
              className="profile-img"
              src={
                this.state.loggedInUserInfo
                  ? this.state.loggedInUserInfo.img_url
                  : "nei"
              }
              onClick={this.toggleDropdown}
            ></img>

            {this.state.displayDropdown ? (
              <div className="menu-items">
                <p className="profile-name">
                  {" "}
                  Hey {this.state.loggedInUserInfo.firstname}!
                </p>
                <Link to="/swipecard">
                  <div
                    className="swipcard-option"
                    onClick={this.toggleDropdown}
                  >
                    <BsHeart />
                    <p>Find Matches</p>
                  </div>
                </Link>
                <Link to="/edit">
                  <div className="profile-option" onClick={this.toggleDropdown}>
                    <BsGear />
                    <p>Edit profile</p>
                  </div>
                </Link>
                <Link to="/preferences">
                  <div
                    className="preferences-option"
                    onClick={this.toggleDropdown}
                  >
                    <BsGear />
                    <p>Edit preferences</p>
                  </div>
                </Link>
                <Link to="/logout">
                  <div className="logout-option" onClick={this.toggleDropdown}>
                    <CgLogOut />
                    <p>Log out</p>
                  </div>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      );
    }
  }
}

export default Navbar;
