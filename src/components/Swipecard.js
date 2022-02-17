import React from "react";
import {
  getUserMatchesById,
  getUsersById,
  getPotentialMatchesByUserId,
  postReaction,
} 
from "../services/dogs";
import Advanced from "../services/TinderCard";
import jwtDecode from "jwt-decode";

class Swipecard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: [],
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem("doggytoken");
    const payload = jwtDecode(token);
    const matches = await getPotentialMatchesByUserId(payload.id);

    this.setState({
      matches,
    });
  }

  async submitReaction(id, boolean) {
    postReaction(id, boolean);

    // SPØR HVORDAN Å RETURNERE FULL TABLE!
  }

  render() {
    const { matches } = this.state;

    const cards = matches.map((user) => {
      return (
        <div className="user-card" key={user.id}>
          <img src={user.img_url} alt="" className="card-img" />
          <p>
            {user.firstname} {user.surname}
          </p>
          <p>{user.age}</p>
          <p>{user.bio}</p>
          <div className="buttons">
            <button onClick={() => this.submitReaction(user.id, "true")}>Like</button>
            <button onClick={() => this.submitReaction(user.id, "false")}>Dislike</button>
          </div>
        </div>
      );
    });

    return (
      <article>{cards.length ? <div>{cards}</div> : <p>Loading</p>}</article>
    );
  }
}

export default Swipecard;
