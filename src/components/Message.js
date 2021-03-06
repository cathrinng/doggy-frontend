import React from "react";
import { getMessages } from "../services/dogs";
// import { submitMessage } from "../services/dogs";
import MessagesInput from "./MessageInput";
import { getUsersById } from "../services/dogs";
import jwtDecode from "jwt-decode";
// import ScrollableFeed from 'react-scrollable-feed'
import ScrollToBottom from "react-scroll-to-bottom";

import socketIOClient from "socket.io-client";
import { Link, useLocation } from "react-router-dom";
import validator from "validator";

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.messagesEndRef = React.createRef();

    this.state = {
      messages: [],
      matchedUserInfo: [],
      payload: {},
    };
    // const location = useLocation();
    // const { from } = location.state;

    this.socket = socketIOClient(process.env.REACT_APP_API_URL);
  }

  async loadmessages(payload) {
    const userId = payload.id;
    const { user_who_matched } = this.props.match.params;
    const messages = await getMessages(userId, user_who_matched);
    this.setState({
      messages,
    });
  }

  async loadMatchedUserInfo() {
    const { user_who_matched } = this.props.match.params;
    const matchedUserInfo = await getUsersById(user_who_matched);
    this.setState({
      matchedUserInfo,
    });
  }

  componentDidMount() {
    this.socket.on("connection", () => {
      console.log(`I'm connected with the back-end`);
    });

    const token = localStorage.getItem("doggytoken");
    const payload = jwtDecode(token);

    if (token) {
      this.setState({
        payload,
      });
    }

    this.loadmessages(payload);
    this.loadMatchedUserInfo();
    this.scrollToBottom();

    let { user_who_matched } = this.props.match.params;
    let string = user_who_matched;

    this.socket.emit("getMessages", { token: token, string: string });
    this.socket.on("recieveMessages", (messages) => {
      this.setState({
        messages,
      });
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.messages.length !== prevState.messages.length) {
      this.scrollToBottom();
    }
  }

  componentWillUnmount() {
    this.socket.emit("end");
    this.socket.disconnect();
    console.log(`I'm disconnected from the back-end`);
  }

  scrollToBottom = () => {
    this.messagesEndRef.scrollIntoView({ behavior: "auto" });
  };

  sendParamsMatch() {
    const { user_who_matched } = this.props.match.params;
    return user_who_matched;
    //denne funksjonen sender verdien av personen du har trykket p?? til imput og velger
    // ?? sende meldig til denne personen
  }
  // componentDidCatch(){

  // }

  render() {
    const renderMatchedUserSurName = this.state.matchedUserInfo.surname;
    const renderMatchedUserImg = this.state.matchedUserInfo.img_url;
    const renderMatchedUserFirstName = this.state.matchedUserInfo.firstname;
    const id = this.state.matchedUserInfo.id;

    //renderMatcheser et objekt og kan ikke mappes gjennom

    // console.log(this.state.matchedUserInfo.id)
    const userId = this.state.payload.id;
    const renderMessages = this.state.messages.reverse().map((data) => {
      let isUser;
      switch (userId == data.from_user_id) {
        case true:
          isUser = true;
          break;
        case false:
          isUser = false;
          break;
      }

      if (validator.isURL(data.message)) {
        return (
          <div
            key={data.id}
            className={
              isUser ? "Loged_inn_user-post user-post" : "match-post user-post"
            }
          >
            <a href={data.message}>
              <p>{data.message}</p>
            </a>
          </div>
        );
      } else {
        return (
          <div
            key={data.id}
            className={
              isUser ? "Loged_inn_user-post user-post" : "match-post user-post"
            }
          >
            <p>{data.message}</p>
          </div>
        );
      }
    });

    return (
      <div className="chat-wrapper">
        <Link to={`/matchedprofile/${id}`}>
          <div className="matched-user">
            <img src={this.props.location.user !== undefined ? this.props.location.user.image : renderMatchedUserImg} alt="" />
            <h2 className="h2">
              {this.props.location.user !== undefined ? this.props.location.user.firstname : renderMatchedUserFirstName} {this.props.location.user !== undefined ? this.props.location.user.surname : renderMatchedUserSurName}
            </h2>
          </div>
        </Link>

        <ScrollToBottom
          className="message-wrapper"
          initialScrollBehavior={"auto"}
        >
          <div className="message-container">
            {renderMessages}
            <div
              style={{ float: "left", clear: "both" }}
              ref={(el) => {
                this.messagesEndRef = el;
              }}
            ></div>
          </div>
        </ScrollToBottom>

        <MessagesInput user_who_matched={this.sendParamsMatch()} />
      </div>
    );
  }
}

export default Messages;
