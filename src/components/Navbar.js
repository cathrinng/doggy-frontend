import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import OutsideClickHandler from "react-outside-click-handler";

// Icons
import { CgLogOut } from "react-icons/cg";
import { BsFillPersonFill, BsGear, BsHeart, BsNewspaper } from "react-icons/bs";

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      displayDropdown: false,
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  componentDidMount() {
    this.props.onLoginChange();
  }

  toggleDropdown(action) {
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
    switch (action) {
      case "close":
        this.setState({
          displayDropdown: false,
        });
    }
  }

  render() {
    if (!this.props.loggedIn) {
      return (
        <div className="navbar public-navbar">
          <Link to="/" onClick={() => this.toggleDropdown("close")}>
            <div className="logo">
              <img src={logo} className="logo-img" />
              <h1>Doggy</h1>
            </div>
          </Link>
          <Link to="/login" className="login-button">
            Login
          </Link>
        </div>
      );
    } else {
      return (
        <div className="navbar private-navbar">
          <Link to="/" onClick={() => this.toggleDropdown("close")}>
            <div className="logo">
              <img src={logo} className="logo-img" />
              <h1>Doggy</h1>
            </div>
          </Link>

          <OutsideClickHandler
            onOutsideClick={() => this.toggleDropdown("close")}
          >
            <div className="dropdown-menu">
              <img
                className="profile-img"
                src={
                  this.props.loggedIn
                    ? this.props.loggedInUserInfo.img_url
                    : "nei"
                }
                onClick={this.toggleDropdown}
              ></img>

              {this.state.displayDropdown ? (
                <div className="menu-items">
                  <p className="profile-name">
                    {" "}
                    Hey {this.props.loggedInUserInfo.firstname}!
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
                  <Link to="/feed">
                    <div
                      className="feed-option"
                      onClick={this.toggleDropdown}
                    >
                      <BsNewspaper/>
                      <p>Go to feed</p>
                    </div>
                  </Link>
                  <Link to="/profile">
                    <div
                      className="profile-option"
                      onClick={this.toggleDropdown}
                    >
                      <BsFillPersonFill />
                      <p>Profile</p>
                    </div>
                  </Link>
                  <Link to="/edit">
                    <div
                      className="edit-option"
                      onClick={this.toggleDropdown}
                    >
                      <BsGear />
                      <p>Edit profile</p>
                    </div>
                  </Link>
                  <Link to="/logout">
                    <div
                      className="logout-option"
                      onClick={this.toggleDropdown}
                    >
                      <CgLogOut />
                      <p>Log out</p>
                    </div>
                  </Link>
                </div>
              ) : null}
            </div>
          </OutsideClickHandler>
        </div>
      );
    }
  }
}

export default Navbar;
