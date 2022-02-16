import React from "react";
import {
  getUserMatchesById,
  getUsersById,
  getPotentialMatchesByUserId,
} from "../services/dogs";
import jwtDecode from "jwt-decode";

class Swipecard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: [],
      matchId: 7,
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
        </div>
      );
    });

    return (
      <article>{cards.length ? <div>{cards}</div> : <p>Loading</p>}</article>
    );
  }
}

export default Swipecard;
