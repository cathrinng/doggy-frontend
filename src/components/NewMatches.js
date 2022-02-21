import React from "react";
import { getUserMatchesById, getMessages } from "../services/dogs";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";

class NewMatches extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: [],
      payload: {},
    };
  }

  async loadFeed() {
    const token = localStorage.getItem("doggytoken");
    const payload = jwtDecode(token);

    if (token) {
      this.setState({
        payload: payload,
      });
      console.log("you are logged inn as " + payload.surname);
    }
    
    const matches = await getUserMatchesById(payload.id);
    this.setState({
      matches,
    });
  }

  componentDidMount() {
    this.loadFeed();
  }

  render() {
    const renderMatches = this.state.matches.map((matchInfo) => {
      return (
        <div key={matchInfo.id} className="match_info">
          {/* <Link to={`/messages/${matchInfo.user_who_matched}`}></Link> */}
          <Link to={`/messages/${matchInfo.user_who_matched}`}>
            <img src={matchInfo.img_url} alt="" />

            {matchInfo.surname}
            {matchInfo.firstname}
            {matchInfo.age}
          </Link>
        </div>
      );
    });
    return <div className="match_info_redrer">{renderMatches}</div>;
  }
}

export default NewMatches;
