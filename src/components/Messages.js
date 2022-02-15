import React from "react";
import { getMessages } from "../services/dogs";


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


  render() {
    const renderMessages = this.state.messages.map((data) => {
      return (
        <div>
         {data.message}
        </div>
      )
    })

    return (
      <div>
        {renderMessages}
        
      </div>
    )
  }
 
}

export default Messages;