import React from "react";
import ExploreIndexItemContainer from "./explore_index_item_container";

class ExploreIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.props.fetchEvents();
  }

  render() {
    const { events } = this.props;
    //
    if (Object.keys(events).length === 0) {
      return <></>;
    } else {
      return (
        <>
          <div className="event-index-header">
            <h1>Discover events</h1>
          </div>
          <div className="event-grid-container">
            {Object.keys(events).map((key, i) => {
              return <ExploreIndexItemContainer key={key} eventId={key} />;
            })}
          </div>
        </>
      );
    }
  }
}
export default withRouter(ExploreIndex);
