import React from "react";
import { getUsers } from "../services/dogs";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dogs: []
    }
  }

  loadDogs() {
    const dogs = await getUsers();
    this.setState({
      dogs
    })
  }

  componentDidMount() {
    this.loadDogs()
  }
  render() {
    const voffs = this.state.dogs.map((dog) => {
      return (
        <div>
          {/* <Link to={`/profile/${dog.id}`}> */}
            {dog.username}{dog.img_url}
          {/* </Link> */}
        </div>
      )
    })

    return (
      <div>
        {voffs}
      </div>
    )
  }
 
}

export default Home;