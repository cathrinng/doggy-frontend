import React from "react";
import { getLoginToken } from "../services/session";
import { Link } from "react-router-dom";
import { BiLockAlt, BiUser, BiShow, BiHide } from "react-icons/bi";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      showPassword: false,
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

  toggleShowPassword() {
    switch (this.state.showPassword) {
      case true:
        this.setState({
          showPassword: false,
        });
        break;
      case false:
        this.setState({
          showPassword: true,
        });
        break;
    }
  }

  render() {
    return (
      <div className="login-container">
        <h1>Login</h1>
        <div className="login-form">
          <div className="input-container">
            <BiUser />
            <input
              type="text"
              value={this.state.email}
              placeholder="email"
              onChange={this.handleInputChange.bind(this, "email")}
            />
          </div>
          <div className="input-container">
            <BiLockAlt />
            <input
              type={!this.state.showPassword ? "password" : "text"}
              value={this.state.password}
              placeholder="password"
              onChange={this.handleInputChange.bind(this, "password")}
            />
            {!this.state.showPassword ? (
              <BiShow onClick={this.toggleShowPassword.bind(this)} />
            ) : (
              <BiHide onClick={this.toggleShowPassword.bind(this)} />
            )}
          </div>
          <div>
            <button onClick={this.handleLoginAttempt.bind(this)}>Log in</button>
          </div>
          <div className="signup-info">
            <p>Not registered?</p>
            <p>
              <Link to="/signup">Sign up to join Doggy here!</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
