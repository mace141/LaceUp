import React from "react";
import { withRouter } from "react-router-dom";
import MapContainer from "./map_container";
class ExploreMain extends React.Component {
  componentDidMount() {
    this.props.fetchParks();
  }
  render() {
    const { parks } = this.props;
    if (!parks) {
      return <>Loading</>;
    } else {
      return (
        <>
          <div className="explore-map-outer">
            <MapContainer parks={parks} />
          </div>
        </>
      );
    }
  }
}

export default withRouter(ExploreMain);
