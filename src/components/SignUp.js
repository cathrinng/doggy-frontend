import React from "react";
import { createUser } from "../services/dogs";
import Autocomplete from "./Autocomplete";
import { CgProfile } from "react-icons/cg";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectSexValue: "",
      showFormError: false,
      user: {
        firstname: "",
        surname: "",
        email: "",
        password: "",
        sex: "",
        age: "",
        breed: "",
        bio: "",
        img_url: "",
      },
    };
  }

  async handleSignUp(e) {
    e.preventDefault();
    //checks if all the fields are filled out
    if (Object.values(this.state.user).some((field) => field === "")) {
      this.setState({ showFormError: true });
      return;
    }

    try {
      await createUser(this.state.user);
      const { history } = this.props;
      history.push("/login");
    } catch (error) {
      console.log("Creating user failed", error);
    }
  }

  handleInputChange(field, event) {
    if (field == "email") {
      this.setState({
        user: {
          ...this.state.user,
          [field]: event.target.value.toLowerCase(),
        },
      });
    } else {
      this.setState({
        user: {
          ...this.state.user,
          [field]: event.target.value,
        },
      });
    }
  }

  handleSexSelect(e) {
    this.setState({
      user: {
        ...this.state.user,
        sex: e.target.value,
      },
    });
  }

  async uploadImageToCloud(imgFile) {
    const data = new FormData();
    data.append("file", imgFile);
    data.append("upload_preset", "img_url");
    data.append("cloud_name", "dbniwuu7z");
    fetch("https://api.cloudinary.com/v1_1/dbniwuu7z/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          user: {
            ...this.state.user,
            img_url: data.url,
          },
        });
      })
      .catch((err) => console.log(err));
  }

  handleCancelClick(e) {
    e.preventDefault();
    const { history } = this.props;
    history.replace("/");
  }

  render() {
    return (
      <div className="sign-up">
        <h1 className="title-text">Sign Up</h1>
        <form
          id="form"
          className="sign-up-form"
          onSubmit={(e) => this.handleSignUp(e)}
          autoComplete="off"
          autoComplete="chrome-off"
          autoComplete="new-password"
        >
          <div className="profile-picture">
            {this.state.user.img_url === "" ? (
              <CgProfile size="50px" className="default-profile-picture" />
            ) : (
              <img
                className="profile-picture-circle"
                src={this.state.user.img_url}
                alt="Profile Image"
                onError={() => this.handlePictureInputError()}
              />
            )}
            <label className="input-label img-label">
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
                value={this.state.user.firstname}
                onChange={this.handleInputChange.bind(this, "firstname")}
              />
            </label>

            <label className="input-label" htmlFor="surname">
              Surname
              <input
                className="input-style"
                type="text"
                name="surname"
                value={this.state.user.surname}
                onChange={this.handleInputChange.bind(this, "surname")}
              />
            </label>
          </div>
          <label className="input-label" htmlFor="email">
            Email
            <input
              className="input-style"
              type="text"
              name="email"
              value={this.state.user.email}
              onChange={this.handleInputChange.bind(this, "email")}
            />
          </label>
          <label className="input-label" htmlFor="password">
            Password
            <input
              className="input-style"
              type="password"
              name="password"
              value={this.state.user.password}
              onChange={this.handleInputChange.bind(this, "password")}
            />
          </label>
          <div className="two-column-row">
            <label className="input-label" htmlFor="sex">
              Sex
              <select
                className="input-style-sex"
                name="sex"
                defaultValue={this.state.selectSexValue || ""}
                onChange={(e) => this.handleSexSelect(e)}
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
                value={this.state.user.age}
                onChange={this.handleInputChange.bind(this, "age")}
              />
            </label>
          </div>
          <label className="input-label" htmlFor="breed">
            Breed
            <Autocomplete
              className="input-style"
              setBreedValue={(value) => {
                this.setState({ user: { ...this.state.user, breed: value } });
              }}
              editValue={this.state.user.breed}
            />
          </label>
          <label className="input-label" htmlFor="bio">
            Bio
            <textarea
              className="text-area-style"
              name="bio"
              value={this.state.user.bio}
              onChange={this.handleInputChange.bind(this, "bio")}
            />
          </label>
          {this.state.showFormError && (
            <span className="form-error-text">
              You must fill out all the fields in sign up.
            </span>
          )}
          <div className="buttons-sign-up-form">
            <button
              className="cancel-button"
              onClick={(e) => this.handleCancelClick(e)}
            >
              Cancel
            </button>
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
