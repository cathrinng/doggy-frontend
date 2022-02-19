import React from "react";
import { getPotentialMatchesByUserId, postReaction } from "../services/dogs";

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
        console.log(id, "right");
        postReaction(id, "true");
        break;
      case "left":
        console.log(id, "left");
        postReaction(id, "false");
        break;
    }
  }

  render() {
    return (
      <div className="swipecards">
        {true ? (
          <div>
            {this.state.matches.length && (
              <Swipe
                matches={this.state.matches}
                submitReaction={this.submitReaction}
              />
            )}
          </div>
        ) : (
          <p>Loading</p>
        )}
      </div>
    );
  }
}

export default Swipecard;
