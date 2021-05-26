import React from "react";
import { withRouter } from "react-router-dom";
import EventIndexItemContainer from "./event_index_item_container";

class EventIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEvents: null,
    };
  }

  componentDidMount() {
    const { park, fetchParksEvents } = this.props;
    fetchParksEvents(park._id);
  }

  render() {
    const { park, errors, parksEvents } = this.props;
    if (Object.keys(parksEvents).length === 0) {
      return <>No events found for {park.name}</>;
    } else {
      return (
        <>
          <h1>Events for {park.name}</h1>
          {Object.entries(parksEvents).map((key) => (
            <EventIndexItemContainer key={key} event={key[1]} park={park} />
          ))}
        </>
      );
    }
  }
}
export default withRouter(EventIndex);
