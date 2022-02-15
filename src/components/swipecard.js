import react from "react";
import React from "react";
import { getUserMatchesById } from "../services/dogs";

class Swipecard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            matches: [],
            myId: 4,
            matchId: 7
        }
    }
    
    async componentDidMount() {
        const matches = await getUserMatchesById(this.state.myId, this.state.matchId);
        this.setState({
            matches
        })
    }

    render () {
        console.log(this.state.matches);

        return (
            <div>My matches</div>
        )
    }
}

export default Swipecard;