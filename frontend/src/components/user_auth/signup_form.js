import React from "react";
import { withRouter } from "react-router-dom";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formNum: 0,
      email: "",
      username: "",
      fname: "",
      lname: "",
      password: "",
      password2: "",
      errors: {},
      isPasswordMatch: true,
      isPasswordLength: true,
      isValidEmail: true,
      isValidPw: false,
      isFname: true,
      isLname: true,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.setForm = this.setForm.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push("/");
    }

    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleEnterClick = (e) => {
    if (e.key === "Enter") {
      if (this.state.formNum === 0) {
        this.handleEmail();
      }
      if (this.state.formNum === 1) {
        this.checkPasswordMatch();
      }
      if (this.state.formNum === 2) {
        this.handleSubmit();
      }
    }
  };

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  setForm(num) {
    return (e) => {
      this.setState({ formNum: num });
    };
  }

  firstPage() {
    return (
      <>
        <div className="signup-form">
          <br />
          <input
            type="text"
            value={this.state.email}
            onChange={this.update("email")}
            placeholder="Email"
            onKeyPress={this.handleEnterClick}
          />
        </div>
        {this.state.isValidEmail ? (
          <></>
        ) : (
          <div className="user-auth-error">Please enter a valid email</div>
        )}
        <button onClick={this.handleEmail}>Continue</button>
        <span>or</span>
        <button onClick={this.props.otherForm} type="button">
          Log in
        </button>
      </>
    );
  }

  isValidEmail(email) {
    //regex pulled from https://www.w3resource.com/javascript/form/email-validation.php
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      return true;
    } else {
      return false;
    }
  }

  handleEmail() {
    if (!this.isValidEmail(this.state.email)) {
      this.setState({ isValidEmail: false });
    } else {
      return this.setState({ formNum: 1 });
    }
  }

  secondPage() {
    const { isPasswordMatch, isPasswordLength, password } = this.state;
    return (
      <>
        <button onClick={this.setForm(0)}>Back</button>
        <h1>Enter a password</h1>
        <input
          type="password"
          value={this.state.password}
          onChange={this.update("password")}
          placeholder="Password"
        />
        <br />
        <input
          type="password"
          value={this.state.password2}
          onChange={this.update("password2")}
          placeholder="Confirm Password"
          onKeyPress={this.handleEnterClick}
        />
        <br />
        {isPasswordMatch ? null : "Passwords do not match"}
        {isPasswordLength ? null : "Password must be at least 6 characters"}
        <button onClick={this.handlePassword}>Continue</button>
      </>
    );
  }

  handlePassword() {
    const { password, password2 } = this.state;
    if (password.length > 5) {
      this.setState({ isPasswordLength: true });
    } else {
      this.setState({ isPasswordLength: false });
    }
    if (password !== password2) {
      this.setState({ isPasswordMatch: false });
    } else {
      this.setState({ isPasswordMatch: true });
    }
    if (password === password && password.length > 5) {
      this.setState({ formNum: 2 });
    }
  }

  thirdPage() {
    const { isLname, isFname } = this.state;
    return (
      <>
        <button onClick={this.setForm(1)}>Back</button>
        <br />
        <input
          type="text"
          value={this.state.fname}
          onChange={this.update("fname")}
          placeholder="First Name"
        />
        {isFname ? null : "Please enter a first name"}
        <br />
        <input
          type="text"
          value={this.state.lname}
          onChange={this.update("lname")}
          placeholder="Last Name"
        />
        {isLname ? null : "Please enter a last name"}
        <br />
        <input
          type="text"
          value={this.state.username}
          onChange={this.update("username")}
          placeholder="Username"
          onKeyPress={this.handleEnterClick}
        />
        <br />
        <button onClick={this.handleName}>Continue</button>
      </>
    );
  }

  handleName() {
    if (this.state.fname !== "" && this.state.lname !== "") {
      this.handleSubmit();
      return;
    }
    if (this.state.lname === "") {
      this.setState({ isLname: false });
    } else {
      this.setState({ isLname: true });
    }

    if (this.state.fname === "") {
      this.setState({ isFname: false });
    } else {
      this.setState({ isFname: true });
    }
    return;
  }

  handleSubmit() {
    let user = {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      username: this.state.username,
      fname: this.state.fname,
      lname: this.state.lname,
    };

    const { signup, errors, closeModal } = this.props;
    signup(user).then(() => {
      if (errors) {
        if (errors.length === 0) {
          closeModal();
        }
      } else {
        closeModal();
      }
    });
  }

  render() {
    if (this.state.formNum === 0) {
      {
        return this.firstPage();
      }
    }
    if (this.state.formNum === 1) {
      {
        return this.secondPage();
      }
    }
    if (this.state.formNum === 2) {
      {
        return this.thirdPage();
      }
    }
  }
}

export default withRouter(SignupForm);
