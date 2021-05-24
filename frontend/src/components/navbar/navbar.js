import React from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // TEMP: empty state
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

  mainDisp() {}
  render() {
    const { openModal, logout, currentUser } = this.props;

    const sessionLinks = () => (
      <nav className="login-signup">
        <button className="loginBtn" onClick={() => openModal("login")}>
          Sign In
        </button>
        <button className="signupBtn" onClick={() => openModal("signup")}>
          Create account
        </button>
      </nav>
    );

    const display = currentUser ? (
      <></>
    ) : (
      // NOT LOGGED IN DISPLAY
      <>{sessionLinks()}</>
    );

    return <nav className="full_header"></nav>;
  }
}
export default NavBar;
