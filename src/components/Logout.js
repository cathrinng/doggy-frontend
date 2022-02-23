import React from "react";
import Loadingdog from "../components/Loadingdog";

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      isDeleted: false,
    })
  }
  async componentDidMount() {
    const { history } = this.props;

    if (this.props.location.state !== undefined) {
      this.setState({
        isDeleted: true
      })
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });

    localStorage.removeItem("doggytoken");
    this.props.onLoginChange();
    history.replace("/");
  }

  render() {
    if (this.state.isDeleted === true) {
      return (
        <div className="loading-container">
          <Loadingdog />
          <div className="loading-message">
            <h1>Sad to see you go!</h1>
            <h2>Thank you for using Doggy!</h2>
          </div>
        </div>
      );
    } else return (
      <div className="loading-container">
          <Loadingdog />
          <div className="loading-message">
            <h1>See you soon!</h1>
          </div>
        </div>
    )
    
  }
}

export default Logout;
