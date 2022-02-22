import React, { Component } from 'react';
// import { BsChatRight } from "react-icons/bs";
// import { AiOutlineHeart } from "react-icons/ai";
// import { Link } from "react-router-dom";
import { getUsersById } from "../services/dogs";
import jwtDecode from "jwt-decode";



class Profile extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            user: [],
           
       
        };
      }
     
  async loadProfile(payload){
    
    const user = await getUsersById(payload.id)
    this.setState({
      user:user
    })
  }

  componentDidMount(){
    const token = localStorage.getItem("doggytoken");
    const payload = jwtDecode(token);
    this.loadProfile(payload)

  }

    render() {
        const renderSurname = this.state.user.surname
        const renderFirstname = this.state.user.firstname
        const renderAge = this.state.user.age
        const renderBio = this.state.user.bio
        const renderImage = this.state.user.img_url
    
        return (
            <div className='user-feed-contain'>
                <img src={renderImage} alt="" />
                <h2>{renderFirstname} {renderSurname} {renderAge}</h2>
                <p>{renderBio}</p>
            </div>
        );
    }
}

export default Profile;