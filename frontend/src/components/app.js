import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, Route } from "react-router-dom";

// import MainPage from "./main/main_page";
import NavBarContainer from "./navbar/navbar_container";
import Modal from "./modal/modal";
import ExploreMainContainer from "./explore/explore_main_container";
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
      <Route exact path="/explore" component={ExploreMainContainer} />
    </Switch>
  </div>
);

export default App;
