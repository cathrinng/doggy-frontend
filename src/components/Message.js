import React from "react";
import { getMessages } from "../services/dogs";
// import { submitMessage } from "../services/dogs";
import MessagesInput from "./MessageInput";
import jwtDecode from "jwt-decode";

class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      payload: {},
    };
  }

  async loadmessages(payload) {
    const userId = payload.id;
    const messages = await getMessages(4, 7);
    this.setState({
      messages: messages,
    });
  }

  componentDidMount() {
    const token = localStorage.getItem("doggytoken");
    const payload = jwtDecode(token);

    if (token) {
      this.setState({
        payload: payload,
      });
     
      console.log("you are logged inn as " + payload.surname);
    }
    this.loadmessages(payload);
  }
  render() {
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

      return (
        <div className={isUser ? "Loged_inn_user-post" : "match-post"}>
          {data.message}
        </div>
      );
    });

    return (
      <div className="chat_container">
        {renderMessages}
        <MessagesInput/>
      </div>
    );
  }
}

export default Messages;
