import React from "react";
import { postMessage } from "../services/dogs";
// import { submitMessage } from "../services/dogs";
// import { getLoginToken } from "../services/session";
import jwtDecode from "jwt-decode";

class MessagesInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messagesInput: "",
      payload: [],
      isLoggedIn: false,
    }
  }
 
  handleKeyDown(e) {
    if(e.keyCode !== 13) {
      return
    }
    const inputText = this.refs.messageInput;
    this.setState({
      messagesInput:inputText.value
    })
    
    // console.log(inputText.value);
    postMessage(inputText.value, 4)
    inputText.value = "";
  }


  render() {
    return (
      <div>
        <input
          ref="messageInput" 
          type="text"
          placeholder="til min fremtidige babbyboo"
          onKeyDown={this.handleKeyDown.bind(this)}
        />
      </div>
    )
  }
 
}

export default MessagesInput;

// lage en input felt som sette inn verdien av en melding i state, den kobles til en funksjon med 3 parametere, token, matchId og 