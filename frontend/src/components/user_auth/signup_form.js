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
    this.handleDemo = this.handleDemo.bind(this);
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
        this.handlePassword();
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

  handleDemo() {
    this.props.login({
      email: 'demo@user.com',
      password: 'password'
    });
  }

  firstPage() {
    return (
      <>
        <div className="login-form-outer-container">
          <h1 className="modal-singin">Sign Up</h1>
          <div onClick={this.props.closeModal} className="close-x">
            x
          </div>
          <p className="modal-slogan">Lets start with an email</p>
          {/* <br /> */}
          <div className="login-form-inner-container">
            <div>
              {this.state.isValidEmail ? (
                <></>
              ) : (
                <div className="user-auth-error">
                  Please enter a valid email
                </div>
              )}
              <label className="modal-label">Email:</label>
              <br />
              <input
                className="modal-input"
                type="text"
                value={this.state.email}
                onChange={this.update("email")}
                onKeyPress={this.handleEnterClick}
              />
              <br />
              <p className="modal-nav-sentence">Already a member of LacedUp?</p>
              <p className="modal-nav-link" onClick={this.props.otherForm}>
                {" "}
                Sign in
              </p>
              <br />
            </div>
            <button className="modal-login-two" onClick={this.handleEmail}>
              Continue
            </button>
            <span className='modal-login-two' onClick={this.handleDemo}>Demo User</span>
          </div>
        </div>
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
        <div className="login-form-outer-container">
          <h1 className="modal-singin">Sign Up</h1>
          <div onClick={this.props.closeModal} className="close-x">
            x
          </div>
          <p className="modal-two-slogan">Next step is providing a password</p>
          <div className="login-form-inner-container">
            <div>
              <div className="modal-password-errors">
                {isPasswordMatch ? null : "Passwords do not match"}
                <br />
                {isPasswordLength
                  ? null
                  : "Password must be at least 6 characters"}
              </div>
              <label className="modal-label">Password:</label>
              <br />
              <input
                className="modal-input"
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
              />
              <section className="modal-input-space"></section>
              <br />
              <label className="modal-label">Confirm password:</label>
              <br />
              <input
                className="modal-input"
                type="password"
                value={this.state.password2}
                onChange={this.update("password2")}
                onKeyPress={this.handleEnterClick}
              />
              <br />
              <p className="modal-back-link" onClick={this.setForm(0)}>
                Back
              </p>
            </div>
            <button className="modal-login-three" onClick={this.handlePassword}>
              Continue
            </button>
          </div>
        </div>
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
        <div className="login-form-outer-container">
          <h1 className="modal-singin">Sign Up</h1>
          <div onClick={this.props.closeModal} className="close-x">
            x
          </div>
          <p className="modal-two-slogan">Last step is your name!</p>
          <div className="login-form-inner-container">
            <div>
              <div className="modal-password-errors">
                {isFname ? null : "Please enter a first name"}
                <br />
                {isLname ? null : "Please enter a last name"}
              </div>
              <label className="modal-label">First Name:</label>
              <br />
              <input
                className="modal-input"
                type="text"
                value={this.state.fname}
                onChange={this.update("fname")}
              />
              <section className="modal-input-space"></section>
              <br />
              <label className="modal-label">Last Name:</label>
              <br />
              <input
                className="modal-input"
                type="text"
                value={this.state.lname}
                onChange={this.update("lname")}
              />
              <section className="modal-input-space"></section>
              <br />
              <label className="modal-label">Username:</label>
              <br />
              <input
                className="modal-input"
                type="text"
                value={this.state.username}
                onChange={this.update("username")}
                onKeyPress={this.handleEnterClick}
              />
              <br />
              <p className="modal-back-link" onClick={this.setForm(1)}>
                Back
              </p>
            </div>
            <button className="modal-login-three" onClick={this.handleName}>
              Sign up
            </button>
          </div>
        </div>
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
      closeModal();
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
