import React from "react";
import TeamsIndex from "../teams/teams_index";

class EventShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIdx: 0,
    };
  }

  componentDidMount() {
    const { fetchEvent, fetchTeams, match } = this.props;
    fetchEvent(match.params.id);
    fetchTeams();
  }

  render() {
    // debugger;
    const { event, teams } = this.props;
    if (!event) return null;

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
    debugger
    const tabs = [<TeamsIndex teams={teams} event={event} />];
    return (
      <div className="event-show">
        <div className="event-details">
          <div className="date-time">
            <p>
              Date/Time: <span>{`${time}, ${month} ${day}, ${year}`}</span>
            </p>
          </div>
          <div className="location">
            <p>
              Location: <span>{event.location_id.name}</span>
            </p>
          </div>
          <div className="sport">
            <p>
              Sport: <span>{event.sport}</span>
            </p>
          </div>
          <div className="skill">
            <p>
              Skill Level: <span>{event.skill}</span>
            </p>
          </div>
          <div className="team-size">
            <p>
              Team Size: <span>{event.team_size}</span>
            </p>
          </div>
          <div className="num-teams">
            <p>
              # of Teams: <span>{event.num_teams}</span>
            </p>
          </div>
          <div className="event-host">
            <p>
              Hosted by:{" "}
              {/* <span>{`${event.user_id.fname} ${event.user_id.lname}`}</span> */}
            </p>
          </div>
        </div>
        <div>
          <span>Players</span>
        </div>
        {tabs[this.state.tabIdx]}
      </div>
    );
  }
}

export default EventShow;
