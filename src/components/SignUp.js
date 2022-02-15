import React from "react";
import { createUser } from "../services/dogs";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.firstnameRef = React.createRef();
    this.surnameRef = React.createRef();
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.breedRef = React.createRef();
    this.bioRef = React.createRef();

    this.state = { selectSexValue: "" };
  }

  async handleSignUp(e) {
    e.preventDefault();
    const user = {
      firstname: this.firstnameRef.current.value,
      surname: this.surnameRef.current.value,
      email: this.emailRef.current.value,
      password: this.passwordRef.current.value,
      sex: this.state.selectSexValue,
      breed: this.breedRef.current.value,
      bio: this.bioRef.current.value,
    };
    if (Object.values(user).some((field) => field === "")) {
      console.log("You must fill out all the fields in sign up.");
      return;
    }

    try {
      const registeredUser = await createUser(user);
      console.log(registeredUser);
    } catch (error) {
      console.log("Creating user failed", error);
    }
  }

  handleSexSelct(e) {
    this.setState({ selectSexValue: e.target.value });
  }

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <form
          id="form"
          className="sign-up-form"
          onSubmit={(e) => this.handleSignUp(e)}
        >
          <label htmlFor="first name">
            First Name
            <input type="text" name="first name" ref={this.firstnameRef} />
          </label>
          <label htmlFor="surname">
            Surname
            <input type="text" name="surname" ref={this.surnameRef} />
          </label>
          <label htmlFor="email">
            E-mail
            <input type="text" name="email" ref={this.emailRef} />
          </label>
          <label htmlFor="password">
            Password
            <input type="password" name="password" ref={this.passwordRef} />
          </label>
          <label htmlFor="sex">
            Sex
            <select
              name="sex"
              defaultValue={this.state.selectSexValue || ""}
              onChange={(e) => this.handleSexSelct(e)}
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
            <input type="text" name="breed" ref={this.breedRef} />
          </label>
          <label htmlFor="bio">
            Bio
            <input type="text" name="bio" ref={this.bioRef} />
          </label>
          <button type="submit">Sign Up</button>
          {/* <span>You must fill out all the fields in sign up.</span> */}
        </form>
      </div>
    );
  }
}
export default SignUp;