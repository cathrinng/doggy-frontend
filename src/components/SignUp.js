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
    this.ageRef = React.createRef();
    this.breedRef = React.createRef();
    this.bioRef = React.createRef();

    this.state = {
      selectSexValue: "",
      profilePictureUrl: "",
      showFormError: false,
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
      age: this.ageRef.current.value,
      breed: this.breedRef.current,
      bio: this.bioRef.current.value,
    };
    console.log(user);

    //checks if all the fields are filled out
    if (Object.values(user).some((field) => field === "")) {
      this.setState({ showFormError: true });
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

  async uploadImageToCloud(imgFile) {
    const data = new FormData();
    data.append("file", imgFile);
    data.append("upload_preset", "img_url");
    data.append("cloud_name", "dbniwuu7z");
    console.log(data);
    fetch("  https://api.cloudinary.com/v1_1/dbniwuu7z/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          profilePictureUrl: data.url,
        });
      })
      .catch((err) => console.log(err));
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
                alt="Profile Image"
                onError={() => this.handlePictureInputError()}
              />
            )}
            <label className="input-label">
              Upload profile picture
              <input
                className="picture-input"
                type="file"
                name="profile picture"
                placeholder="Input profile picture url"
                onChange={(e) => this.uploadImageToCloud(e.target.files[0])}
              />
            </label>
          </div>

          <div className="two-column-row">
            <label className="input-label" htmlFor="first name">
              First Name
              <input
                className="input-style"
                type="text"
                name="first name"
                ref={this.firstnameRef}
              />
            </label>

            <label className="input-label" htmlFor="surname">
              Surname
              <input
                className="input-style"
                type="text"
                name="surname"
                ref={this.surnameRef}
              />
            </label>
          </div>
          <label className="input-label" htmlFor="email">
            Email
            <input
              className="input-style"
              type="text"
              name="email"
              ref={this.emailRef}
            />
          </label>
          <label className="input-label" htmlFor="password">
            Password
            <input
              className="input-style"
              type="password"
              name="password"
              ref={this.passwordRef}
            />
          </label>
          <div className="two-column-row">
            <label className="input-label" htmlFor="sex">
              Sex
              <select
                className="input-style-sex"
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
            <label className="input-label" htmlFor="age">
              Age
              <input
                className="input-style"
                type="text"
                name="age"
                ref={this.ageRef}
              />
            </label>
          </div>
          <label className="input-label" htmlFor="breed">
            Breed
            <Autocomplete
              className="input-style"
              setBreedValue={(value) => {
                this.breedRef.current = value;
              }}
            />
          </label>
          <label className="input-label" htmlFor="bio">
            Bio
            <textarea
              className="text-area-style"
              name="bio"
              ref={this.bioRef}
            />
          </label>
          {this.state.showFormError && (
            <span className="form-error-text">
              You must fill out all the fields in sign up.
            </span>
          )}
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
          </div>
        </form>
      </div>
    );
  }
}
export default SignUp;
