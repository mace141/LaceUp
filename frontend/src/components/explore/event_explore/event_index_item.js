import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class EventIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { event, fetchUser } = this.props;
    fetchUser(event.user_id);
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
    const { event, park, host } = this.props;

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date(event.date);

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const time = `${hours}:${minutes}`;

    if (!host) {
      return null;
    } else {
      // debugger;
      return (
        <>
          <div className="explore-index-item">
            <div className="event-info">
              <div className="sport">
                <p>
                  <span>Sport:</span>{" "}
                  <span className="ex-idx-sport-info">
                    {this.titleize(event.sport)}
                  </span>
                </p>
              </div>
              <div className="location">
                <p>
                  <span>Location:</span>{" "}
                  <span className="ex-idx-sport-info">{park.name}</span>
                </p>
              </div>
              <div className="date-time">
                <p>
                  <span>Date/Time:</span>{" "}
                  <span>{`${time}, ${month} ${day}, ${year}`}</span>
                </p>
              </div>

              <div className="skill">
                <p>
                  <span>Type:</span>{" "}
                  <span className="ex-idx-sport-info">{event.type}</span>
                </p>
              </div>
              <div className="team-size">
                <p>
                  <span>Team Size:</span>{" "}
                  <span className="ex-idx-sport-info">{event.team_size}</span>
                </p>
              </div>
            </div>
            <div className="link-to-event">
              <button className="join-game-btn">
                <Link to={`/events/${event._id}`}>Join game</Link>
              </button>
            </div>
          </div>
        </>
      );
    }
  }
}

export default withRouter(EventIndexItem);
