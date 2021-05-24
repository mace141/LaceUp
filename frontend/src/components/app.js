import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";

// import MainPage from "./main/main_page";
import NavBarContainer from "./navbar/navbar_container";
import Modal from "./modal/modal";
// import LoginFormContainer from "./user_auth/login_form_container";
// import SignupFormContainer from "./user_auth/signup_form_container";

const App = () => (
  <div>
    <Modal />
    <NavBarContainer />
    <Switch>
      {/* <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} /> */}
    </Switch>
  </div>
);

export default App;
