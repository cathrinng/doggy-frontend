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
        {false ? (
          <div>
            <Swipe
              matches={this.state.matches}
              submitReaction={this.submitReaction}
            />
          </div>
        ) : (
          <div className="loading-container">
            <div class="corgi">
              <div class="head">
                <div class="ear ear--r"></div>
                <div class="ear ear--l"></div>

                <div class="eye eye--left"></div>
                <div class="eye eye--right"></div>

                <div class="face">
                  <div class="face__white">
                    <div class=" face__orange face__orange--l"></div>
                    <div class=" face__orange face__orange--r"></div>
                  </div>
                </div>

                {/* <div class="face__curve"></div> */}

                <div class="mouth">
                  <div class="nose"></div>
                  <div class="mouth__left">
                    <div class="mouth__left--round"></div>
                    <div class="mouth__left--sharp"></div>
                  </div>

                  <div class="lowerjaw">
                    <div class="lips"></div>
                    <div class="tongue test"></div>
                  </div>

                  <div class="snout"></div>
                </div>
              </div>

              <div class="neck__back"></div>
              <div class="neck__front"></div>

              <div class="body">
                <div class="body__chest"></div>
              </div>

              <div class="foot foot__left foot__front foot__1"></div>
              <div class="foot foot__right foot__front foot__2"></div>
              <div class="foot foot__left foot__back foot__3"></div>
              <div class="foot foot__right foot__back foot__4"></div>

              <div class="tail test"></div>
            </div>
            <div className="loading-message">
              <h1>Fetching Barks!</h1>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Swipecard;
