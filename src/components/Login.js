import React from "react";
import { getLoginToken } from "../services/session";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleInputChange(field, event) {
    this.setState({
      [field]: event.target.value,
    });
  }

  async handleLoginAttempt() {
    const { history } = this.props;

    // perform the actual login

    try {
      // 1. Make a POST request to /login in the API
      const { token } = await getLoginToken({
        email: this.state.email,
        password: this.state.password,
      });

      if (!token) {
        throw new Error("Unsuccessful login");
      }

      // 2. Store token in local storage
      localStorage.setItem("doggytoken", token);

      //2.1 Change Login status
      this.props.onLoginChange();

      // 3. Redirect back to feed
      history.replace("/");
    } catch (error) {}
  }

  componentDidMount() {
    const bcrypt = require("bcryptjs");

    const saltRounds = 10; //  Data processing speed
    var password = "Fkdj^45ci@Jad"; // Original Password
    var password2 = "Fkdj^45ci@Jad";
    bcrypt.hash(password, saltRounds, function (err, hash) {
      // Salt + Hash
      bcrypt.compare(password2, hash, function (err, result) {
        // Compare
        // if passwords match
        if (result) {
          console.log("It matches!");
        }
        // if passwords do not match
        else {
          console.log("Invalid password!");
        }
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <label>
          Email:
          <input
            type="text"
            value={this.state.email}
            onChange={this.handleInputChange.bind(this, "email")}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange.bind(this, "password")}
          />
        </label>
        <div>
          <button onClick={this.handleLoginAttempt.bind(this)}>Log in</button>
        </div>
        <div className="signup-info">
          <p>Not registered?</p>
          <p>
            <Link to="/signup">Sign up and join Doggy here!</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
