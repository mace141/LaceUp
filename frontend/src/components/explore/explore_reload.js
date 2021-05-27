import React from "react";
import { Redirect } from "react-router-dom";
class ExploreReload extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const park = this.props.location.state.selectedPlace;

    return (
      <>
        <Redirect
          to={{
            pathname: `/explore`,
            state: {
              selectedPlace: park,
            },
          }}
        />
      </>
    );
  }
}

export default ExploreReload;
