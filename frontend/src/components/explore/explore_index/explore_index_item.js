import React from "react";

import { withRouter, Link } from "react-router-dom";

class ExploreIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // this.props.fetchEvents(this.props.eventId);
  }

  render() {
    const { park } = this.props;
    if (!park) {
      return null;
    } else {
      return (
        <>
          <div className="explore-index-item">
            <h1>{park.name}</h1>
            <Link
              className="search-res-link"
              to={{
                pathname: `/explore/reload`,
                state: {
                  selectedPlace: park,
                },
              }}
            >
              Click here
            </Link>
            <h2>
              {park.address}, {park.borough}
            </h2>
            <h2>{park.sports}</h2>
          </div>
        </>
      );
    }
  }
}

export default withRouter(ExploreIndexItem);
