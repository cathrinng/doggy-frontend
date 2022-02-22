import React from "react";
import { getUserMatchesById, getMessagesByUserId } from "../services/dogs";
import { formatDistance } from "date-fns";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import Loadingdog from "./Loadingdog";


class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: [],
      newMessages: [],
      payload: {},
      isLoading: true,
      error: null,
    }
  }

  async loadFeed() {
    this.setState({
      ...this.state,
      isLoading: true,
    })

    const token = localStorage.getItem("doggytoken");
    const payload = jwtDecode(token);
    const newMessages = await getMessagesByUserId();
    const matches = await getUserMatchesById(payload.id);
    // console.log("all new messages", newMessages);

    this.setState({
      newMessages,
      payload,
      isLoading: false,
      matches,
    })
  }

  async componentDidMount() {
    try {
     await this.loadFeed(); 
    }
    catch (error) {
      this.setState({ error })
    }
  }

  render() {
    const {
      isLoading,
      newMessages,
      error,
    } = this.state;

    if(error) {
      return (
        <div>Ops something went wrong! Unable to load feed: {error.message} </div>
      )
    }

    if(isLoading) {
      return (
        <div>Loading feed...</div>
      )
    }

    const renderMatches = this.state.matches.map((matchInfo) => {
      return (
        <div key={matchInfo.id} className="match-info">
          <Link to={`/messages/${matchInfo.user_who_matched}`}>
            <img src={matchInfo.img_url} alt=""/>
            <h5>{matchInfo.surname} {matchInfo.firstname}</h5>
          </Link>
        </div>
      );
    });

    const messageElements = {};
    const myID = this.state.payload.id;
    
    newMessages.forEach(msg => {
      let indexID = 0;
      if(msg.to_user_id !== myID) {
        indexID = msg.to_user_id;
      } else {
        indexID = msg.from_user_id
      }
      if(messageElements[indexID]) {
        messageElements[indexID].push(msg)
      } else {
        messageElements[indexID] = [msg]
      }
    });

    const messageList = Object.values(messageElements);
    console.log("messagelist", messageList)

    const renderMessages = messageList
    .map((listElement) => {
      const lastMessage = listElement[0];
      const myID = this.state.payload.id;

      const displayed_fname = lastMessage.from_user_id == myID ? (lastMessage.to_firstname) : (lastMessage.from_firstname);
      const displayed_lname = lastMessage.from_user_id == myID ? (lastMessage.to_surname) : (lastMessage.from_surname);

      const timeAgo = formatDistance(
          new Date(lastMessage.created_at),
          new Date(),
          { addSuffix: true }
        );

      return (
        <div key={lastMessage.id}>
          <Link to={`/messages/${lastMessage.from_user_id}/${lastMessage.to_user_id}`}>
            <div className="message-cards">
              <img src={lastMessage.from_img_url}/>
              <p><h5>{displayed_lname} {displayed_fname}</h5>
              {lastMessage.message} - {timeAgo}</p>
            </div>
          </Link>
        </div>
      )
    });

    return (
      <div className="feed-container">
        <div className="match-container">
          <h3>New matches</h3>
          <div className="matches">
            {renderMatches}
          </div>
        </div>
        <div className="message-container">
          <h3>Messages</h3>
          <div className="message-list">  
            {renderMessages}
          </div>
        </div>
    </div>
    )
  }
}

export default Feed;