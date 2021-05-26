import React from "react";

import { withRouter } from "react-router-dom";

class ExploreIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchEvents(this.props.eventId);
  }

  render() {
    const { event } = this.props;
    if (!event) {
      return null;
    } else {
      return (
        <>
          <div className="explore-index-item"></div>
        </>
      );
    }
  }
}

export default withRouter(ExploreIndexItem);
