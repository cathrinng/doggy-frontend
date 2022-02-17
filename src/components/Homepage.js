import React from "react";

class Homepage extends React.Component {
  handleClick() {
    const { history } = this.props;
    history.push('/about');
  }

  render() {
    
    return (
      <div>
        <h3>Welcome to doggy</h3>
        <div className="container-homepage" style={{border: '2px solid black', width: '300px'}}>
          <img src="#" className="img-homepage"/>
          <div className="text-homepage">
            <h4>Meet other single dogs near you!</h4>
            <div>Doggy is the largest dating app for dogs in the world. Card desription. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit rhoncus imperdiet nisi.</div>
          </div>
          <button 
          className="button-homepage"
          onClick={this.handleClick.bind(this)}>Learn more!
          </button>
        </div>
      </div>
    )
  }
}

export default Homepage;