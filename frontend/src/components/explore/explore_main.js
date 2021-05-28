import React from "react";
import { withRouter } from "react-router-dom";
import MapContainer from "./map_container";

class ExploreMain extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchParks();
  }

  render() {
    const { parks, preSelected } = this.props;
    if (!parks) {
      return <>Loading</>;
    } else {
      return (
        <>
          <div className="explore-map-outer">
            <MapContainer
              preSelected={!!preSelected ? preSelected.selectedPlace : null}
              parks={parks}
            />
          </div>
        </>
      );
    }
  }
}

export default withRouter(ExploreMain);
