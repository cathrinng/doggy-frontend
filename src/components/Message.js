import React from "react";
import { getMessages } from "../services/dogs";
// import { submitMessage } from "../services/dogs";
import MessagesInput from "./MessageInput";
import { getUsersById } from "../services/dogs";
import jwtDecode from "jwt-decode";
import ScrollToBottom from 'react-scroll-to-bottom';
// import ScrollableFeed from 'react-scrollable-feed'

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.messagesEndRef = React.createRef()

    this.state = {
      messages: [],
      matchedUserInfo:[],
      payload: {},
      
    };
  }

  async loadmessages(payload) {
    const userId = payload.id;
    const { user_who_matched } = this.props.match.params;
    const messages = await getMessages(userId, user_who_matched);
    this.setState({
      messages: messages,
    });
  }
  
  async loadMatchedUserInfo(){
    const { user_who_matched } = this.props.match.params;
    const matchedUserInfo = await getUsersById(user_who_matched)
    this.setState({
      matchedUserInfo:matchedUserInfo
    })

  }

  componentDidMount() {
    // console.log("funksjon som returnerer en verdi" + this.sendparamstomessageinput())
    
    
    const token = localStorage.getItem("doggytoken");
    const payload = jwtDecode(token);

    if (token) {
      this.setState({
        payload: payload,
      });
     
      console.log("you are logged inn as " + payload.surname);
    }
    this.loadmessages(payload);
    this.loadMatchedUserInfo()
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    this.messagesEndRef.scrollIntoView({ behavior: "smooth" });
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }

  sendParamsMatch(){
    const { user_who_matched } = this.props.match.params;
    return user_who_matched
    //denne funksjonen sender verdien av personen du har trykket på til imput og velger
    // å sende meldig til denne personen
  }
  // componentDidCatch(){

  // }
  
  render() {
    const renderMatchedUserSurName = this.state.matchedUserInfo.surname
    const renderMatchedUserImg = this.state.matchedUserInfo.img_url
    const renderMatchedUserFirstName = this.state.matchedUserInfo.firstname
    
    
    //renderMatcheser et objekt og kan ikke mappes gjennom
   
    console.log(this.state.matchedUserInfo.id)
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
        <div key={data.id} className={isUser ? "Loged_inn_user-post" : "match-post"}>
          {/* <div><img className="message-img" src={data.from_img_url} alt="" /></div> */}
          {data.message}
          
        </div>
      );
    });

    return (
      
      <div className="message-container" >
        <div className="matched-user">
          <img src={renderMatchedUserImg}  alt="" />
          <h2 className="h2">{renderMatchedUserSurName} {renderMatchedUserFirstName}</h2>
        </div>

        <div className="Scrollbox">
          <div className="chat_container">
           {renderMessages}
        </div>
        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEndRef = el; }}>
        </div>
        </div>
       
        <div> 
          <MessagesInput user_who_matched={this.sendParamsMatch() }/>
        </div>
      </div>
     
    );
  }
}

export default Messages;



