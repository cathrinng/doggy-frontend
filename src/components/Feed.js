import React from "react";
import { getUserMatchesById, getMessagesByUserId } from "../services/dogs";
import { formatDistance } from "date-fns";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
// import Loadingdog from "./Loadingdog";



class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // matches: [],
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

    this.props.onLoginChange();
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
      matches,
    } = this.state;

    if(error) {
      return (
        <div>Ops something went wrong! Unable to load feed: {error.message} </div>
      )
    }

    if(isLoading) {
      return (
       <div className="loading-container"></div>
      )
    }

    const renderMatches = this.state.matches.map((matchInfo) => {
      return (
        <div key={matchInfo.id} className="match-info">
          <Link to={`/messages/${matchInfo.user_who_matched}`}>
            <img src={matchInfo.img_url} alt=""/>
            <h5>{matchInfo.firstname} {matchInfo.surname}</h5>
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

    const renderMessages = messageList
    .map((listElement) => {
      const lastMessage = listElement[0];
      const myID = this.state.payload.id;

      const displayed_fname = lastMessage.from_user_id === myID ? (lastMessage.to_firstname) : (lastMessage.from_firstname);
      const displayed_lname = lastMessage.from_user_id === myID ? (lastMessage.to_surname) : (lastMessage.from_surname);
      const renderedID = lastMessage.from_user_id === myID ? (lastMessage.to_user_id) : (lastMessage.from_user_id);
      const matchedUserImg = lastMessage.from_user_id === myID ? (lastMessage.to_img_url) : (lastMessage.from_img_url);

      const timeAgo = formatDistance(
          new Date(lastMessage.created_at),
          new Date(),
          { addSuffix: true }
        );


      return (
        <div key={lastMessage.id}>
          <Link to={`/messages/${renderedID}`}>
            <div className="message-cards">
              <img src={matchedUserImg}/>
              <div className="message-text">
                  <h5>{displayed_fname} {displayed_lname}</h5>
              {lastMessage.message} - {timeAgo}</div>
            </div>
          </Link>
        </div>
      )
    });

    return (
      <div className="feed-container">
        <div className="match-container">
          <h3>New matches</h3>
          {this.state.matches.length > 0 ? (
            <div className="matches">
              {renderMatches}
            </div>
          ) : (
            <div className="matches">
              <p className="no-match">No matches yet!</p>
            </div>
          )}
        </div>
        <div className="msg-container">
          <h3>Messages</h3>
          {this.state.newMessages.length > 0 ? (
            <div className="message-list">  
              {renderMessages}
            </div>
          ) : (
            <div className="message-list">
                <p className="no-message">No messages yet!</p>
            </div>
          )} 
        </div>
    </div>
    )
  }
}

export default Feed;