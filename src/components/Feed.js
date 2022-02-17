import React, { Component, Fragment } from "react";
import { getUserMatchesById, getMessages, getUsersById } from "../services/dogs";

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matchArray: [],
      detailTweet: [],
    }
  }

  async loadFeed() {
    const matches = await getUserMatchesById(4);

    // const users = await getUsersById();
    const getMatchIdArray = matches.map((matchId) => {
     return matchId.user_who_matched
    });

    let matchInfo = getMatchIdArray.map(async (id) => {
      let output = await getUsersById(id)
      return output;
    })

    let something = Promise.all(matchInfo).then(function(values) {
      return values;
    });

  console.log(something);
    

    // this.setState({
    //   matchArray: getMatchId
     
    // })

    // for (let i = 0; i < getMatchId.length; i++) {
    //   const detailTweet = getUsersById(getMatchId[i]);
    //   detailTweet.then((res) => {
    //     this.setState({
    //       detailTweet: res,
    //     });
    //   });
    // }

    // this.setState({
    //   users:users
    // })

    
    
    // console.log("matchId:", getMatchId);

  }

  componentDidMount() {
    this.loadFeed();
  }

  render() {
    

    const makeToAnArry = Object.keys(this.state.detailTweet);
    const renderMtches = makeToAnArry.map((matchInfo)=>{
      return(
        <div>
          {matchInfo.surname}
        </div>
      )

    })
    console.log(this.state.detailTweet)
    // const matchElements = getUsersById(this.state.matchArray);
    // console.log("matchlist:", matchElements);
    
    

    return (
      <div>
        {renderMtches}
      </div>
    )
  }
}

export default Feed;