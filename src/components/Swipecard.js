import React from "react";
import { getPotentialMatchesByUserId, postReaction } from "../services/dogs";
import Loadingdog from "../components/Loadingdog";

import Swipe from "../components/Swipe";
import jwtDecode from "jwt-decode";

class Swipecard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: [],
      payload: {},
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem("doggytoken");
    const payload = jwtDecode(token);
    const matches = await getPotentialMatchesByUserId(payload.id);

    this.setState({
      matches,
      payload,
    });
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
          <div>
            <Swipe
              matches={this.state.matches}
              submitReaction={this.submitReaction}
            />
          </div>
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
