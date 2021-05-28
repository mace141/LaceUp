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
    const time = `${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0'+minutes : minutes} ${hours > 12 ? 'PM' : 'AM'}`;

    if (!host) {
      return null;
    } else {
      return (
        <>
          <div className="explore-index-item">
            <div className="date-time">
              <p>
                Date/Time: <span>{`${time}, ${month} ${day}, ${year}`}</span>
              </p>
            </div>
            <div className="location">
              <p>
                Location: <span>{park.name}</span>
              </p>
            </div>
            <div className="sport">
              <p>
                Sport: <span>{event.sport}</span>
              </p>
            </div>
            <div className="skill">
              <p>
                Skill level: <span>{event.skill}</span>
              </p>
            </div>
            <div className="team-size">
              <p>
                Team Size: <span>{event.team_size}</span>
              </p>
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
