import React from "react";
import { getUsers } from "../services/dogs";
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom'

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dogs: []
    }
  }

  async loadDogs() {
    const dogElements = await getUsers();
    this.setState({
      dogs: dogElements
    })
  }

  componentDidMount() {
    this.loadDogs()
  }
  handleLoginAttempt(){
    const { history } = this.props;
    history.replace('/about');
    
  }

  render() {
    const voffs = this.state.dogs.map((dog) => {
      return (
        <div 
        key={dog.id}
        className="box-profile"
        style={{border: '2px solid black'}}
        >
          <Link to={`/profile/${dog.id}`}>
            {dog.surname} {dog.firstname} {dog.img_url}
          </Link>
        </div>
      )
    })

    return (
      <div>
        <h2>Available dogs</h2>
        {voffs}
      </div>
    )
  }
 
}

export default Home;