import './App.css';
import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Homepage from "./components/Homepage";
import About from "./components/About";
import Navbar from './components/Navbar';

class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      payload: {},
    }
  }

//   componentDidMount() {
//     const token = localStorage.getItem('doggytoken');
//     this.setState({
//       payload,
//       isLoggedIn: false,
//     });

//     const logout = () => {
//       this.setState({
//         isLoggedIn: false,
//       })
//       return localStorage.removeItem('doggytoken')
//     }

//     if(!token) {
//       this.setState({
//         isLoggedIn: false,
//       })
//       return (
//       <div className="public-navbar">
//       <img src='#' className='logo-img'/>
//       <h1>Doggy</h1>
//       <button 
//       className="login-button"
//       onClick={this.handleLoginAttempt.bind(this)}
//       >Register/Login
//       </button>
//       </div>
//       )

//     } else {
//     this.setState({
//     isLoggedIn: true,
//     })
//       return (
//         <div>
//         <img src='#' className='logo-img'/>
//         <h1>Doggy</h1>
//         <img src='#'
//         className='profile-img'
//         onClick={logout}
//         />Logout
//       </div>
//       )
//     }
//   }
// }

  render() {
  return (
    <HashRouter>
      <Navbar loggedIn={this.state.isLoggedIn}
      />
    <Switch>
      <Route path='/' exact component={Homepage}></Route>
      <Route path='/about' component={About}></Route>
    </Switch>
    </HashRouter>
  );
}
}

export default App;
