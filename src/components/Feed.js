import React, { Component, Fragment } from "react";
import { getUserMatchesById, getMessages, getUsersById } from "../services/dogs";

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: [],
      matchArray: []
      // messages: [],
      // users: [],
    }
  }

  async loadFeed() {
    // const messages = await getMessages();
    const matches = await getUserMatchesById(4);
    const users = await getUsersById();

    const getMatchId = matches.map((matchId) => {
     return matchId.user_who_matched;
    })

    this.setState({
      matches,
      matchArray: getMatchId
      // messages,
      // users,
    })
    
    console.log("matches:", matches);
    console.log("matchId:", getMatchId);

  }

  componentDidMount() {
    this.loadFeed();
  }

  render() {
    const matchElements = getUsersById(this.state.matchArray);
    console.log("matchlist:", matchElements);

    return (
      <div>
      </div>
    )
  }
}

export default Feed;