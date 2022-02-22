import React from "react";
import { editUser, getUsersById } from "../services/dogs";
import jwtDecode from "jwt-decode";
import Autocomplete from "./Autocomplete";
import { CgProfile } from "react-icons/cg";
import Loadingdog from "../components/Loadingdog";

class Edit extends React.Component {
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
      user: {},
      isLoading: false,
      profilePictureUrl: "",
      breed: "",
    };
  }

  async componentDidMount() {
    if (!this.props.loggedIn) {
      const { history } = this.props;
      history.push("/");
    }

    const id = await this.getUserIdFromToken(window.localStorage.doggytoken);

    try {
      this.setState({ isLoading: true });
      const user = await getUsersById(id);
      this.setState({ user, isLoading: false });
    } catch (error) {
      this.setState({ error });
    }
  }

  async getUserIdFromToken(token) {
    const { id } = await jwtDecode(token);
    return id;
  }

  handleCancelClick(e) {
    e.preventDefault();
    const { history } = this.props;
    history.push("/");
  }

  async handleSaveClick(e) {
    e.preventDefault();
    const { user } = this.state;
    const editedUser = {
      id: user.id,
      img_url:
        this.state.profilePictureUrl == ""
          ? user.img_url
          : this.state.profilePictureUrl,
      firstname:
        this.firstnameRef.current.value == ""
          ? user.firstname
          : this.firstnameRef.current.value,
      surname:
        this.surnameRef.current.value == ""
          ? user.surname
          : this.surnameRef.current.value,
      email:
        this.emailRef.current.value == ""
          ? user.email
          : this.emailRef.current.value,
      password:
        this.passwordRef.current.value == ""
          ? user.password
          : this.passwordRef.current.value,
      sex:
        this.state.selectSexValue == "" ? user.sex : this.state.selectSexValue,
      age:
        this.ageRef.current.value == "" ? user.age : this.ageRef.current.value,
      breed: this.state.breed == "" ? user.breed : this.state.breed,
      bio:
        this.bioRef.current.value == "" ? user.bio : this.bioRef.current.value,
    };
    console.log(editedUser);
    try {
      await editUser(editedUser);
      const { history } = this.props;
      history.push("/");
    } catch (error) {
      console.log("Deleting user failed", error);
    }
  }

  handleSexSelect(e) {
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
    const { id } = this.props;
    const { user, isLoading, error } = this.state;

    if (error) {
      return (
        <div>
          <p>Error: {error.message}</p>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="loading-container">
          <Loadingdog />
          <div className="loading-message">
            <h1>Fetching Profile!</h1>
          </div>
        </div>
      );
    }

    if (!user) {
      return (
        <div>
          <p>No user with id: {id} found</p>
        </div>
      );
    }

    return (
      <div className="edit-user">
        <h1>Edit User</h1>
        <form
          id="form"
          className="edit-user-form"
          onSubmit={(e) => this.handleSignUp(e)}
        >
          <div className="profile-picture">
            {/* {this.state.profilePictureUrl === "" ? (
              <CgProfile size="50px" className="default-profile-picture" />
            ) : (
              <img
                className="profile-picture-circle"
                src={this.state.profilePictureUrl}
                alt="Profile Image"
                onError={() => this.handlePictureInputError()}
              />
            )} */}
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
                ref={this.ageRef}
              />
            </label>
          </div>
          <label className="input-label auto-field" htmlFor="breed">
            Breed
            <Autocomplete
              className="input-style"
              setBreedValue={(value) => {
                console.log(value);
                this.setState({ breed: value });
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
          <div className="buttons-edit-user-form">
            <button
              className="cancel-button-link"
              onClick={(e) => this.handleCancelClick(e)}
            >
              Cancel
            </button>
            <button
              className="save-changes-button"
              onClick={(e) => this.handleSaveClick(e)}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default Edit;
