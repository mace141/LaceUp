import React from "react";
import { withRouter } from "react-router-dom";
import { closeModal } from "../../actions/modal_actions";
import logo from "../../style/assets/logoB.png";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
      currentUser: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  // Once the user has been authenticated, redirect to the Tweets page
  componentWillReceiveProps(nextProps) {
    // Set or clear errors
    this.setState({ errors: nextProps.errors });
  }

  // Handle field updates (called in the render method)
  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      password: this.state.password,
    };
    // debugger;
    const { login, errors, closeModal } = this.props;
    login(user);
    // login(user);
  }
  // Render the session errors if there are any
  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  handleDemo() {
    this.props.login({
      email: 'demo@user.com',
      password: 'password'
    });
  }

  render() {
    if (!!this.props.currentUser) {
      this.props.closeModal();
      return <></>;
    } else {
      return (
        <div className="login-form-outer-container">
          {/* <img className="modal-logo" src={logo}></img> */}
          <h1 className="modal-singin">Sign In</h1>
          <div onClick={this.props.closeModal} className="close-x">
            x
          </div>
          <p className="modal-slogan">Sign up, link up, lace up</p>
          <form
            className="login-form-inner-container"
            onSubmit={this.handleSubmit}
          >
            <div>
              {this.renderErrors()}
              <label className="modal-label">Email:</label>
              <br />
              <input
                className="modal-input"
                type="text"
                value={this.state.email}
                onChange={this.update("email")}
              />
              <section className="modal-input-space"></section>
              <br />
              <label className="modal-label">Password:</label>
              <br />
              <input
                className="modal-input"
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
              />
              <br />
              <p className="modal-nav-sentence">Still need to join LaceUp?</p>
              <p className="modal-nav-link" onClick={this.props.otherForm}>
                {" "}
                Sign up
              </p>
              <br />
            </div>
            <input className="modal-login-two" type="submit" value="Log In" />
            <span className='modal-login-two' onClick={this.handleDemo}>Demo User</span>
          </form>
        </div>
      );
    }
  }
}

export default withRouter(LoginForm);
