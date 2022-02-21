import React, { Component } from 'react';
// import { BsChatRight } from "react-icons/bs";
// import { AiOutlineHeart } from "react-icons/ai";
// import { Link } from "react-router-dom";
import { getUsersById } from "../services/dogs";


class UserFeed extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            user: [],
       
        };
      }
     
  async loadUserFeed(){
    // const { user_who_matched } = this.props.match.params;
    const user = await getUsersById(4)
    this.setState({
      user:user
    })
  }

  componentDidMount(){
      this.loadUserFeed()

  }

    render() {
        const renderSurname = this.state.user.surname
        const renderFirstname = this.state.user.firstname
        const renderAge = this.state.user.age
        const renderBio = this.state.user.bio
        const renderImage = this.state.user.img_ur
    
        return (
            <div>
                <h2>{renderFirstname} {renderSurname} {renderAge}</h2>
                <img src={renderImage} alt="" />
                <p>{renderBio}</p>
            </div>
        );
    }
}

export default UserFeed;