import React from "react";
import { withRouter } from "react-router-dom";
import MapContainer from "./map_container";
class ExploreMain extends React.Component {
  constructor(props) {
    super(props);
    // debugger;
  }
  componentDidMount() {
    this.props.fetchParks();
  }
  render() {
    // debugger;
    const { parks, preSelected } = this.props;
    if (!parks) {
      return <>Loading</>;
    } else {
      // debugger;
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
