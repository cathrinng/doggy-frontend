import React from "react";
import { getMessages } from "../services/dogs";
// import { submitMessage } from "../services/dogs";
import MessagesInput from './MessageInput'




class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    }
  }

  async loadmessages() {
    const messages = await getMessages(4,7);
    this.setState({
      messages: messages
    })
  }

  componentDidMount() {
    this.loadmessages()
  }
  // handleKeyDown(e) {
  //   if(e.keyCode !== 13) {
  //     return
  //   }
  //   const inputText = this.refs.messageInput;
  //   console.log(inputText.value);
  
  //   submitMessage({message: inputText.value}, 4, 7);
  //   inputText.value = "";
  //   this.loadmessages()
   
  // }


  render() {
    const renderMessages = this.state.messages.reverse().map((data) => {
      
      return (
        <div
        
        >
         {data.message}
        </div>
      )
    })

    return (
      <div>
        {renderMessages}
        <MessagesInput/>
      </div>
    )
  }
 
}

export default Messages;



