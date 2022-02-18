import React from "react";
import { getUserMatchesById, getMessages} from "../services/dogs";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import NewMatches from "./NewMatches";


class Feed extends React.Component {
  constructor(props) {
    super(props);

  }




  render() {
 
      
      
    return (
        <NewMatches/>
    )
  }
}

export default Feed;