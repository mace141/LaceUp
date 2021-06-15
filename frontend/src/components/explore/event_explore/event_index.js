import React from "react";
import { withRouter } from "react-router-dom";
import EventIndexItemContainer from "./event_index_item_container";

class EventIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEvents: null,
      parksEvents: [],
    };
  }

  componentDidUpdate(prevProps) {
    const { park, fetchParksEvents } = this.props;
    if (this.props.park._id !== prevProps.park._id) {
      fetchParksEvents(park._id).then((payload) => {
        debugger;
        this.setState({ parksEvents: payload.events });
      });
    }
  }
  componentDidMount() {
    const { park, fetchParksEvents } = this.props;
    fetchParksEvents(park._id).then((payload) => {
      debugger;
      this.setState({ parksEvents: payload.events });
    });
  }

  render() {
    // debugger;
    const { park, errors, isCurrentUser, openModal } = this.props;
    const { parksEvents } = this.state;
    if (Object.keys(parksEvents).length === 0) {
      return (
        <>
          <div className="sw-header-container">
            <h1 className="side-window-header">
              No events found for {park.name}
            </h1>
          </div>
          {isCurrentUser ? (
            <div className="explore-index-item">
              <button
                className="host-a-game"
                onClick={() => openModal("newEvent")}
              >
                Host your own?
              </button>
            </div>
          ) : (
            <div className="explore-index-item">
              <button
                className="join-game-btn"
                onClick={() => openModal("login")}
              >
                Host your own?
              </button>
              {/* <>Sign in to host your own</> */}
            </div>
          )}
        </>
      );
    } else {
      return (
        <>
          <div className="sw-header-container">
            <h1 className="side-window-header">Events for {park.name}</h1>
            {isCurrentUser ? (
              <div className="host-your-own-btn">
                <button
                  className="host-a-game"
                  onClick={
                    isCurrentUser
                      ? () => openModal("newEvent")
                      : () => openModal("login")
                  }
                >
                  Host an event
                </button>
              </div>
            ) : null}
          </div>
          {Object.entries(parksEvents).map((key) => (
            <EventIndexItemContainer key={key} event={key[1]} park={park} />
          ))}
        </>
      );
    }
  }
}
export default withRouter(EventIndex);
