import React from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionChange: this.props.loggedIn,
    };

    this.handleTabClick = this.handleTabClick.bind(this);
    this.leaveTab = this.leaveTab.bind(this);
  }

  handleTabClick(e) {
    const currEle = e.currentTarget;
    currEle.classList.add("selected");
  }

  leaveTab(e) {
    const currEle = e.currentTarget;
    currEle.classList.remove("selected");
  }

  sessionLinks() {
    // conditional rendering for logged in/out
    const { openModal, currentUser } = this.props;
    if (!currentUser) {
      return (
        <nav className="login-signup">
          <button
            className="login-btn form-button"
            onClick={() => openModal("login")}
          >
            Sign In
          </button>
          <button
            className="signup-btn form-button"
            onClick={() => openModal("signup")}
          >
            Create account
          </button>
        </nav>
      );
    } else {
      // logged in display
      return (
        <nav className="login-signup">
          <button onClick={() => this.props.logout()}>Logout</button>
        </nav>
      );
    }
  }
  mainDisp() {
    // Display for every user
    return (
      <>
        <div className="navbar-left">
          <Link to="/">LaceUp</Link>
        </div>
        <div className="navbar-right">
          <Link
            to="/explore"
            onFocus={this.handleTabClick}
            onBlur={this.leaveTab}
          >
            Explore
          </Link>
          <Link to="/host" onFocus={this.handleTabClick} onBlur={this.leaveTab}>
            Host
          </Link>
          {this.sessionLinks()}
        </div>
      </>
    );
  }
  render() {
    return <nav className="full-navbar">{this.mainDisp()}</nav>;
  }
}
export default NavBar;
