import react from "react";
import React from "react";
import { getUserMatchesById, getUsersById } from "../services/dogs";

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
        const user = await getUsersById(2);
        console.log(user);
    }

    render () {

        return (
            <div>My matches</div>
        )
    }
}

export default Swipecard;