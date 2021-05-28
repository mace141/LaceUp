import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, Route, Redirect } from "react-router-dom";
import Profile from "./user_profile/profile";

// import MainPage from "./main/main_page";
import NavBarContainer from "./navbar/navbar_container";
import Modal from "./modal/modal";
import ExploreMainContainer from "./explore/explore_main_container";
import EventShowContainer from "./events/event_show_container";
import SplashContainer from "./splash/splash_container";
import ExploreReload from "./explore/explore_reload";
// import LoginFormContainer from "./user_auth/login_form_container";
// import SignupFormContainer from "./user_auth/signup_form_container";

const App = () => (
  <div>
    <Modal />
    <NavBarContainer />
    <div className="main-content-div">
      <Switch>
        {/* <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <Redirect exact path="/signup" component={SignupFormContainer} /> */}
        <Route exact path="/" component={SplashContainer} />
        <Route exact path="/explore" component={ExploreMainContainer} />
        <Route exact path="/explore/reload" component={ExploreReload} />
        <Route exact path="/users/:id" component={Profile} />
        <Route exact path="/events/:id" component={EventShowContainer} />
      </Switch>
    </div>
  </div>
);

export default App;
