import React from "react";
import { postMessage } from "../services/dogs";
// import { submitMessage } from "../services/dogs";
// import { getLoginToken } from "../services/session";
// import jwtDecode from "jwt-decode";
import { FiSend } from "react-icons/fi";
import { IconName } from "react-icons/ai";
import Picker from "emoji-picker-react";
import { GrEmoji } from "react-icons/gr";
import validator from "validator";

class MessagesInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messagesInput: "",
      payload: [],
      isLoggedIn: false,
      displayEmojis: false,
    };
    this.inputRef = React.createRef();
  }

  handleKeyDown(e) {
    if (e.keyCode !== 13) {
      return;
    } else this.sendMessage();
  }

  sendMessage() {
    const inputText = this.inputRef.current;
    if (inputText.value === "") {
      return;
    }

    
    this.setState({
      messagesInput: inputText.value,
    });
    
    // console.log(inputText.value);
    const user_who_matched = this.props.user_who_matched;

    if (validator.isURL(inputText.value)) {
      console.log("Is Valid URL");
    } else {
      console.log("Is Not Valid URL");
    }

    postMessage(inputText.value, user_who_matched);
    inputText.value = "";
  }

  // toggleEmojis() {
  //   switch (this.state.displayEmojis) {
  //     case true:
  //       this.setState({
  //         displayEmojis: false,
  //       });
  //       break;
  //     case false:
  //       this.setState({
  //         displayEmojis: true,
  //       });
  //       break;
  //   }
  // }

  render() {
    return (
      <div className="inputContainer">
        {/* <div onClick={this.toggleEmojis.bind(this)}><GrEmoji></GrEmoji></div> */}
        <form className="inputTextBox">
          <input
            ref={this.inputRef}
            type="text"
            placeholder="Insert message"
            onKeyDown={this.handleKeyDown.bind(this)}
          />
          <FiSend
            onClick={this.sendMessage.bind(this)}
            className="sendIcon"
          ></FiSend>
        </form>
      </div>
    );
  }
}

export default MessagesInput;

// lage en input felt som sette inn verdien av en melding i state, den kobles til en funksjon med 3 parametere, token, matchId og
