import React from "react";
import {
  getPotentialMatchesByUserId,
  postReaction,
} from "../services/dogs";

import Swipe from "../components/Swipe"
import jwtDecode from "jwt-decode";

class Swipecard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: [],
      payload: {}
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
    switch(direction) {
      case 'right':
      console.log(id, 'right');
      postReaction(id, true);
      break;
      case 'left':
      console.log(id, 'left');
      break;
    }

    // postReaction(id, boolean);
  }

  render() {
    // const { matches } = this.state;
    // const cards = matches.map((user) => {
    //   return (
    //     <div className="user-card" key={user.id}>
    //       <img src={user.img_url} alt="" className="card-img" />
    //       <p>
    //         {user.firstname} {user.surname}
    //       </p>
    //       <p>{user.age}</p>
    //       <p>{user.bio}</p>
    //       <div className="buttons">
    //         <button onClick={() => this.submitReaction(user.id, "true")}>
    //           Like
    //         </button>
    //         <button onClick={() => this.submitReaction(user.id, "false")}>
    //           Dislike
    //         </button>
    //       </div>
    //     </div>
    //   );
    // });

    return (
      <div className="swipecards">{true ? <div>
        { this.state.matches.length && <Swipe
      matches={this.state.matches}
      submitReaction={this.submitReaction}
      />}
      </div> : <p>Loading</p>}</div>
    );
  }
}

export default Swipecard;
