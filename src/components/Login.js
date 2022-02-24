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
      flagError: false,
    };
  }

  handleInputChange(field, event) {
    this.setState({
      [field]: event.target.value,
    });
  }

  handleSubmit(e) {
    if (e.keyCode === 13) {
      this.handleLoginAttempt();
    }
  }

  async handleLoginAttempt() {
    const { history } = this.props;

    // perform the actual login

    try {
      // 1. Make a POST request to /login in the API
      const { token } = await getLoginToken({
        email: this.state.email.toLowerCase(),
        password: this.state.password,
      });

      if (!token) {
        this.setState({
          flagError: true,
        })
        throw new Error("Unsuccessful login");
      } this.setState({
        flagError: false,
      })

      // 2. Store token in local storage
      localStorage.setItem("doggytoken", token);

      //2.1 Change Login status
      this.props.onLoginChange();

      // 3. Redirect back to feed
      history.replace("/swipecard");
    } catch (error) {}
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
              onKeyDown={this.handleSubmit.bind(this)}
              />
            {!this.state.showPassword ? (
              <BiShow onClick={this.toggleShowPassword.bind(this)} />
            ) : (
              <BiHide onClick={this.toggleShowPassword.bind(this)} />
            )}
          </div>
          <div>
            <button onClick={this.handleLoginAttempt.bind(this)}>Log In</button>
          </div>
          <div className={this.state.flagError ? "show-error" : "hide-error"}>Invalid username or password</div>
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
