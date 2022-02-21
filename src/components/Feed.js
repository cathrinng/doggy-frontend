import React from "react";
import { getUserMatchesById, getMessagesByUserId } from "../services/dogs";
import { formatDistance } from "date-fns";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import NewMatches from "./NewMatches";


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
    const matches = await getUserMatchesById(payload.id);
    const newMessages = await getMessagesByUserId();
    console.log("all new messages", newMessages);

    this.setState({
      matches,
      newMessages,
      payload,
      isLoading: false,
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
      matches,
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
          <p><img className="img-message" src={lastMessage.from_img_url}/>{displayed_fname} {displayed_lname} - {timeAgo}</p>
          <p>{lastMessage.message}</p></Link>
          </div>
      )
    })
  
    return (
      <div><NewMatches/>
        <h1>Feed for {this.state.payload.firstname}</h1>
        <div className="scroll-box"></div>
        {renderMessages}
      </div>
    )
  }
}

export default Feed;