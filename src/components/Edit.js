import React from "react";
import { editUser, getUsersById } from "../services/dogs";
import jwtDecode from "jwt-decode";

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.firstnameRef = React.createRef();
    this.surnameRef = React.createRef();
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.breedRef = React.createRef();
    this.bioRef = React.createRef();

    this.state = { selectSexValue: "", user: {}, isLoading: false };
  }

  async componentDidMount() {
    if (!window.localStorage.doggytoken) {
      return;
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
  }

  async handleSaveClick(e) {
    e.preventDefault();
    const { user } = this.state;
    const editedUser = {
      id: user.id,
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
      breed:
        this.breedRef.current.value == ""
          ? user.breed
          : this.breedRef.current.value,
      bio:
        this.bioRef.current.value == "" ? user.bio : this.bioRef.current.value,
    };

    try {
      await editUser(editedUser);
    } catch (error) {
      console.log("Deleting user failed", error);
    }
  }

  handleSexSelect(e) {
    this.setState({ selectSexValue: e.target.value });
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
        <div>
          <p>Loading user details...</p>
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
      <div>
        <h1>Edit User</h1>
        <form
          id="form"
          className="sign-up-form"
          onSubmit={(e) => this.handleSignUp(e)}
        >
          <label htmlFor="first name">
            First Name
            <input
              type="text"
              name="first name"
              placeholder="First Name"
              ref={this.firstnameRef}
            />
          </label>
          <label htmlFor="surname">
            Surname
            <input
              type="text"
              name="surname"
              placeholder="Surname"
              ref={this.surnameRef}
            />
          </label>
          <label htmlFor="email">
            E-mail
            <input
              type="text"
              name="email"
              placeholder="E-mail"
              ref={this.emailRef}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              placeholder="Password"
              ref={this.passwordRef}
            />
          </label>
          <label htmlFor="sex">
            Sex
            <select
              name="sex"
              defaultValue={this.state.selectSexValue || ""}
              onChange={(e) => this.handleSexSelect(e)}
            >
              <option disabled value="">
                -- select an option --
              </option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </label>
          <label htmlFor="breed">
            Breed
            <input
              type="text"
              name="breed"
              placeholder="Breed"
              ref={this.breedRef}
            />
          </label>
          <label htmlFor="bio">
            Bio
            <input
              type="text"
              name="bio"
              placeholder="Write something..."
              ref={this.bioRef}
            />
          </label>
          <button onClick={(e) => this.handleSaveClick(e)}>
            Save changes!
          </button>
        </form>
      </div>
    );
  }
}
export default Edit;
