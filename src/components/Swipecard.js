import React from "react";
import { getPotentialMatchesByUserId, postReaction } from "../services/dogs";
import Loadingdog from "../components/Loadingdog";

import Swipe from "../components/Swipe";
import jwtDecode from "jwt-decode";
import socketIOClient from "socket.io-client";

class Swipecard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: [],
      payload: {},
    };
    this.socket = socketIOClient(process.env.REACT_APP_API_URL);
  }

  async componentDidMount() {
    this.socket.on("connection", () => {
      console.log(`Fetching matches from back-end`);
    });

    const token = localStorage.getItem("doggytoken");
    const payload = jwtDecode(token);
    const matches = await getPotentialMatchesByUserId(payload.id);

    this.setState({
      matches,
      payload,
    });

    this.socket.emit("getMatches", token);
    this.socket.on("recieveMatches", (potentialMatches) => {
      this.setState({
        matches,
      });
    });
  }

  componentWillUnmount() {
    this.socket.emit("end");
    this.socket.disconnect();
    console.log(`I'm disconnected from the back-end`);
  }

  async submitReaction(id, direction) {
    switch (direction) {
      case "right":
        postReaction(id, "true");
        break;
      case "left":
        postReaction(id, "false");
        break;
    }
  }

  render() {
    return (
      <div className="swipecards">
        {this.state.matches.length > 0 ? (
          
            <Swipe
              matches={this.state.matches}
              submitReaction={this.submitReaction}
            />
          
        ) : (
          <div className="loading-container">
            <Loadingdog />
            <div className="loading-message">
              {!this.state.matches.length > 0 ? (
                <h1>No barks at the moment!</h1>
              ) : (
                <h1>Fetching Barks!</h1>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Swipecard;
