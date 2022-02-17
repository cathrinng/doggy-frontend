import React, { Component, Fragment } from "react";
import { getUserMatchesById, getMessages } from "../services/dogs";

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: [],
      messages: [],
    }
  }

  async loadFeed() {
    const messages = await getMessages();
    console.log(messages);
    const matches = await getUserMatchesById(myId, matchId);
    console.log(matches);

    this.setState({
      matches,
      messages,
    })
  }
}