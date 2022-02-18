import React from "react";
import { getUserMatchesById, getMessages} from "../services/dogs";
import jwtDecode from "jwt-decode";


class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: [],
     
    }
  }

  async loadFeed() {
    const matches = await getUserMatchesById(4);
    this.setState({
      matches,
    })
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
  
    this.loadFeed();
    
  }

  render() {
    const renderMatches = this.state.matches.map((matchInfo)=>{
      return(
        <div key={matchInfo.id} className="match_info">
          <img src ={matchInfo.img_url} alt="" />
          
         {matchInfo.surname}
         {matchInfo.firstname}
         {matchInfo.age}
          
          
        </div>
      )
    })
    return (
      <div className="match_info_redrer">
        {renderMatches}
      </div>
    )
  }
}

export default Feed;