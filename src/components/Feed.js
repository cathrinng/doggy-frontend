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
    console.log(newMessages);

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

    const renderMessages = newMessages.map(({ id, from_img_url, from_firstname, from_surname, to_user_id, from_user_id, message, created_at }) => {
      const timeAgo = formatDistance(
        new Date(created_at),
        new Date(),
        { addSuffix: true }
      );


      return (
        <div key={id}>
          <Link to={`/messages/${from_user_id}/${to_user_id}`}>
          <p><img className="img-message" src={from_img_url}/> {from_firstname} {from_surname} - {timeAgo}</p>
          <p>{message}</p> 
          </Link>
        </div>
      );
    })

    const renderMatches = matches.map((matchInfo)=>{
      return(
        
          <div key={matchInfo.id} className="match_info">
            <Link to={`/messages/${matchInfo.user_who_matched}`}>
              <img src ={matchInfo.img_url} alt=""/>
              {matchInfo.surname}
              {matchInfo.firstname}
              {matchInfo.age}
            </Link>
          </div>
      )
    })

    return (
      <div><NewMatches/>
      <div className="match-container">
        <h1>Feed for {this.state.payload.firstname}</h1>
        <div className="match-box">
          {renderMatches}
        </div>
        <div className="message-box">
          {renderMessages}
        </div>
      </div>
      </div>
    )
  }
}

export default Feed;