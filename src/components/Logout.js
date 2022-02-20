import React from "react";
import Loadingdog from "../components/Loadingdog";

class Logout extends React.Component {
  async componentDidMount() {
    const { history } = this.props;

    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });

    localStorage.removeItem("doggytoken");
    this.props.onLoginChange();
    history.replace("/");
  }

  render() {
    return (
      <div className="loading-container">
        <Loadingdog />
        <div className="loading-message">
          <h1>See you soon!</h1>
        </div>
      </div>
    );
  }
}

export default Logout;
