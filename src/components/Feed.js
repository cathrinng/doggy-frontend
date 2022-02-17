import React from "react";
import { getUserMatchesById, getMessages} from "../services/dogs";

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