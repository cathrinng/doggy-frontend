import React, { Component } from "react";
import { BsNewspaper } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BsHeart } from "react-icons/bs";

class Footer extends Component {
  componentDidMount() {
    this.props.onLoginChange();
  }

  render() {
    if (!this.props.loggedIn) {
      return null;
    } else {
      return (
        <div className="footerContainer">
          <Link to="/swipecard">
            <div>
              <BsHeart className="heartIcon" />
            </div>
          </Link>
          <Link to="/feed">
            <div>
              <BsNewspaper className="messageIcon" />
            </div>
          </Link>
        </div>
      );
    }
  }
}

export default Footer;
