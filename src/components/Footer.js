import React, { Component } from 'react';
import { BsChatRight } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

class Footer extends Component {
<<<<<<< HEAD
    constructor(props) {
        super(props);
    
        this.state = { 
       
        };
      }
    render() {
        return (
            <div className='footerContainer'>
                <Link to='/swipecard'>
                    <div>
                        <AiOutlineHeart className='heartIcon'/>
                    </div> 
                </Link>
=======
    componentDidMount() {
        this.props.onLoginChange();
    };
>>>>>>> 62a607f1112f3a54979a3ca575e44160a0ca7d0b

    render() {
        if(!this.props.loggedIn) {
            return null
        } else {
            return (
                <div className='footerContainer'>
                    <Link to='/swipecard'>
                        <div>
                            <AiOutlineHeart className='heartIcon'/>
                        </div> 
                    </Link>
                    <Link to='/feed'>
                        <div>
                            <BsChatRight className='messageIcon'/>
                        </div> 
                    </Link>
                </div>
                )
            }
        
    }
}

export default Footer;