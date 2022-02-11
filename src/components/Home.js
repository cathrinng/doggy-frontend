import React from "react";
import { getUsers } from "../services/dogs";

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

  render() {
    const voffs = this.state.dogs.map((dog) => {
      return (
        <div 
        className="box-profile"
        style={{border: '2px solid black'}}
        >
          {/* <Link to={`/profile/${dog.id}`}> */}
            {dog.surname} {dog.firstname} {dog.img_url}
          {/* </Link> */}
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