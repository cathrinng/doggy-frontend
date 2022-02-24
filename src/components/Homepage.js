import React from "react";
import About from "./About";
import { Link } from "react-router-dom";

class Homepage extends React.Component {
  handleClick() {
    const { history } = this.props;
    history.push("/signup");
  }

  render() {
    return (
      <div className="homepage-container">
        <div className="welcome-card">
          <img
            src="https://www.sunnyskyz.com/uploads/2015/03/pqm0a-cuddle-time.jpg"
            className="img-homepage"
          />
          <div className="card-info">
            <h4>Meet other single dogs near you!</h4>
            <p>
              Doggy is the largest dating app for dogs. Stop
              barking up the wrong tree and join us to find out why!
               <Link to={"/about"} className="learn-link">Learn more</Link>
            </p>
            <button
              className="button-homepage"
              onClick={this.handleClick.bind(this)}
            >
              Register here
            </button>
            <div className="clearfix"></div>
          </div>
        </div>
      </div>
      
    );
  }
}

export default Homepage;
