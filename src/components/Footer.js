import React, { Component } from "react";
import { BsChatRight } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

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
              <AiOutlineHeart className="heartIcon" />
            </div>
          </Link>
          <Link to="/feed">
            <div>
              <BsChatRight className="messageIcon" />
            </div>
          </Link>
        </div>
      );
    }
  }
}

export default Footer;
