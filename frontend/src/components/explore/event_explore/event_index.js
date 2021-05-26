import React from "react";
import { withRouter } from "react-router-dom";

class EventIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { park, fetchParksEvents } = this.props;
    fetchParksEvents(park._id);
  }

  render() {
    const { park, errors } = this.props;
    //
    if (!errors) {
      return <>Events for {park.name}</>;
    } else {
      return <>{errors}</>;
    }
  }
}
export default withRouter(EventIndex);
