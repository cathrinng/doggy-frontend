import React from "react";
import { editUser, getUsersById, deleteUser } from "../services/dogs";
import jwtDecode from "jwt-decode";
import Loadingdog from "../components/Loadingdog";
import Autocomplete from "./Autocomplete";

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        id: "",
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
      isLoading: false,
    };
  }

  async componentDidMount() {
    if (!this.props.loggedIn) {
      const { history } = this.props;
      history.push("/");
      return;
    }

    try {
      const token = localStorage.getItem("doggytoken");
      const payload = jwtDecode(token);
      this.setState({ isLoading: true });
      const user = await getUsersById(payload.id);

      this.setState({
        user: { ...user, id: payload.id },
        isLoading: false,
      });
    } catch (error) {
      this.setState({ error });
    }
  }

  handleCancelClick(e) {
    e.preventDefault();
    const { history } = this.props;
    history.replace("/feed");
  }

  handleInputChange(field, event) {
    console.log(field);
    this.setState({
      user: {
        ...this.state.user,
        [field]: event.target.value,
      },
    });
  }

  async handleEditSubmit(e) {
    e.preventDefault();
    const { history } = this.props;

    const editedUser = this.state.user;
    try {
      await editUser(editedUser);
      history.replace("/feed");
    } catch (error) {
      console.log("Failed to contact database! Please try again.", error);
    }
  }

  async handleDeleteUser(e) {
    if (prompt("This will permanently delete user. Type delete to continue")) {
      try {
        let deletedBoolean = await deleteUser();
        if (deletedBoolean.userDeleted === true) {
          console.log("User deleted");
          const { history } = this.props;
          history.push({
            pathname: '/logout',
            state: { deleted: true }
        });
        } else return;
      } catch (error) {
        console.log("Failed to contact database! Please try again.", error);
      }
    } else return;
  }

  async uploadImageToCloud(imgFile) {
    const data = new FormData();
    data.append("file", imgFile);
    data.append("upload_preset", "img_url");
    data.append("cloud_name", "dbniwuu7z");
    fetch("  https://api.cloudinary.com/v1_1/dbniwuu7z/image/upload", {
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

    return (
      <div className="edit-user">
        <h1>Edit User</h1>
        <form id="form" className="edit-user-form">
          <div className="profile-picture">
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
                value={this.state.user.firstname}
                onChange={this.handleInputChange.bind(this, "firstname")}
              />
            </label>
            <label className="input-label" htmlFor="surname">
              Surname
              <input
                className="input-style"
                type="text"
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
              value={this.state.user.email}
              onChange={this.handleInputChange.bind(this, "email")}
            />
          </label>
          <label className="input-label" htmlFor="password">
            Password
            <input
              className="input-style"
              type="password"
              value={this.state.user.password}
              onChange={this.handleInputChange.bind(this, "password")}
            />
          </label>
          <div className="two-column-row">
            <label className="input-label" htmlFor="sex">
              Sex
              <select
                className="input-style-sex"
                defaultValue={this.state.user.sex || ""}
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
                value={this.state.user.age}
                onChange={this.handleInputChange.bind(this, "age")}
              />
            </label>
          </div>
          <label className="input-label auto-field" htmlFor="breed">
            Breed
            <Autocomplete
              className="input-style"
              setBreedValue={(value) => {
                this.setState({ user: { breed: value } });
              }}
              editValue={this.state.user.breed}
            />
          </label>
          <label className="input-label" htmlFor="bio">
            Bio
            <textarea
              className="text-area-style"
              value={this.state.user.bio}
              onChange={this.handleInputChange.bind(this, "bio")}
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
              onClick={(e) => this.handleEditSubmit(e)}
            >
              Save
            </button>
          </div>
        </form>
        <button
          className="delete-user-button"
          onClick={(e) => this.handleDeleteUser(e)}
        >
          Delete user
        </button>
      </div>
    );
  }
}
export default Edit;
