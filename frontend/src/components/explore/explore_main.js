import React from "react";
import { withRouter } from "react-router-dom";
import MapContainer from "./map_container";
class ExploreMain extends React.Component {
  render() {
    return (
      <>
        <div className="explore-map-outer">
          <MapContainer className="map-container" />
        </div>
      </>
    );
  }
}

export default withRouter(ExploreMain);
