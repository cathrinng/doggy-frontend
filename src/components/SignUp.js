import React from "react";
import { createUser } from "../services/dogs";
import Autocomplete from "./Autocomplete";
import { CgProfile } from "react-icons/cg";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.firstnameRef = React.createRef();
    this.surnameRef = React.createRef();
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.breedRef = React.createRef();
    this.bioRef = React.createRef();

    this.state = {
      selectSexValue: "",
      profilePictureUrl: "",
      showProfilePictureError: false,
    };
  }

  async handleSignUp(e) {
    e.preventDefault();
    const user = {
      img_url: this.state.profilePictureUrl,
      firstname: this.firstnameRef.current.value,
      surname: this.surnameRef.current.value,
      email: this.emailRef.current.value,
      password: this.passwordRef.current.value,
      sex: this.state.selectSexValue,
      breed: this.breedRef.current,
      bio: this.bioRef.current.value,
    };
    console.log(user);
    if (Object.values(user).some((field) => field === "")) {
      console.log("You must fill out all the fields in sign up."); // Check if all the fields are filled
      return;
    }

    try {
      console.log(user);
      const registeredUser = await createUser(user);
      console.log(registeredUser);
      const { history } = this.props;
      history.push("/login");
    } catch (error) {
      console.log("Creating user failed", error);
    }
  }

  handleSexSelct(e) {
    this.setState({ selectSexValue: e.target.value });
  }

  handlePictureInput(e) {
    this.setState({
      profilePictureUrl: e.target.value,
      showProfilePictureError: false,
    });
  }

  handlePictureInputError() {
    this.setState({ profilePictureUrl: "", showProfilePictureError: true });
  }

  render() {
    return (
      <div className="sign-up">
        <h1 className="title-text">Sign Up</h1>
        <form
          id="form"
          className="sign-up-form"
          onSubmit={(e) => this.handleSignUp(e)}
        >
          <div className="profile-picture">
            {this.state.profilePictureUrl === "" ? (
              <CgProfile size="50px" className="default-profile-picture" />
            ) : (
              <img
                className="profile-picture-circle"
                src={this.state.profilePictureUrl}
                alt="Image does not exist"
                onError={() => this.handlePictureInputError()}
              />
            )}
            <input
              className="picture-input"
              type="text"
              name="profile picture"
              placeholder="Input profile picture url"
              onBlur={(e) => this.handlePictureInput(e)}
            />
            {this.state.showProfilePictureError && (
              <span className="image-error">Image does not exist</span>
            )}
          </div>
          <div className="two-column-row">
            <label className="input-label" htmlFor="first name">
              First Name
              <input
                className="input-style"
                type="text"
                name="first name"
                placeholder="First Name"
                ref={this.firstnameRef}
              />
            </label>

            <label className="input-label" htmlFor="surname">
              Surname
              <input
                className="input-style"
                type="text"
                name="surname"
                placeholder="Surname"
                ref={this.surnameRef}
              />
            </label>
          </div>
          <label className="input-label" htmlFor="email">
            E-mail
            <input
              className="input-style"
              type="text"
              name="email"
              placeholder="E-mail"
              ref={this.emailRef}
            />
          </label>
          <label className="input-label" htmlFor="password">
            Password
            <input
              className="input-style"
              type="password"
              name="password"
              placeholder="Password"
              ref={this.passwordRef}
            />
          </label>

          <label className="input-label" htmlFor="sex">
            Sex
            <select
              className="input-style"
              name="sex"
              defaultValue={this.state.selectSexValue || ""}
              onChange={(e) => this.handleSexSelct(e)}
            >
              <option disabled value="">
                - select an option -
              </option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </label>

          <label className="input-label" htmlFor="breed">
            Breed
            <Autocomplete
              className="input-style"
              setBreedValue={(value) => {
                console.log(value);
                this.breedRef.current = value;
              }}
            />
          </label>
          <label className="input-label" htmlFor="bio">
            Bio
            <textarea
              className="text-area-style"
              name="bio"
              placeholder="Write something..."
              ref={this.bioRef}
            />
          </label>
          <div className="buttons-sign-up-form">
            <a
              href="https://doggy-frontend.herokuapp.com/#/"
              className="cancel-button-link"
            >
              Cancel
            </a>
            <button className="sign-up-button" type="submit">
              Sign Up
            </button>
            {/* <span>You must fill out all the fields in sign up.</span> */}
          </div>
        </form>
      </div>
    );
  }
}
export default SignUp;
