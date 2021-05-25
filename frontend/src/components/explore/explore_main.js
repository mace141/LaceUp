import React from "react";
import { withRouter } from "react-router-dom";
// import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import MapContainer from "./map_container";
class ExploreMain extends React.Component {
  render() {
    return <MapContainer />;
  }
}

export default withRouter(ExploreMain);
