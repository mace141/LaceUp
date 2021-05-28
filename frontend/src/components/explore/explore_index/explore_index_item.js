import React from "react";

import { withRouter, Link } from "react-router-dom";

class ExploreIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // this.props.fetchEvents(this.props.eventId);
  }
  titleize(str) {
    if (!str.split) return str;
    const _titleizeWord = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
      },
      result = [];
    str.split(" ").forEach((word) => {
      result.push(_titleizeWord(word));
    });
    return result.join(" ");
  }
  render() {
    const { park } = this.props;
    if (!park) {
      return null;
    } else {
      return (
        <>
          <div className="explore-index-item">
            <Link
              className="search-res-link"
              to={{
                pathname: `/explore/reload`,
                state: {
                  selectedPlace: park,
                },
              }}
            >
              <h1 className="park-idx-link">Events at {park.name}</h1>
            </Link>
            <h2>Sports: {this.titleize(park.sports)}</h2>
            <h2 className="park-address">
              {park.address}, {park.borough}
            </h2>
          </div>
        </>
      );
    }
  }
}

export default withRouter(ExploreIndexItem);
