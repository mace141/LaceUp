import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchEvent } from '../../actions/event_actions';
import { fetchParks } from '../../actions/park';
import { fetchUser } from '../../util/user_api';
import TeamsIndex from '../teams/teams_index';

class EventShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIdx: 0,
    };
  }

  componentDidMount() {
    const { fetchEvent,  match } = this.props;

    fetchEvent(match.params.id);
  }

  render() {
    const { event } = this.props;
    if (!event) return null; 
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(event.date);

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours}:${minutes}`;
    
    const tabs = [<TeamsIndex teamIds={event.team_id}/>];
    
    return (
      <div className='event-show'>
        <div className='event-details'>
          <div className='date-time'>
            <p>Date/Time: <span>{`${time}, ${month} ${day}, ${year}`}</span></p>
          </div>
          <div className='location'>
            <p>Location: <span>{event.location_id.name}</span></p>
          </div>
          <div className='sport'>
            <p>Sport: <span>{event.sport}</span></p>
          </div>
          <div className='skill'>
            <p>Skill Level: <span>{event.skill}</span></p>
          </div>
          <div className='team-size'>
            <p>Team Size: <span>{event.team_size}</span></p>
          </div>
          <div className='num-teams'>
            <p># of Teams: <span>{event.num_teams}</span></p>
          </div>
          <div className='event-host'>
            <p>Hosted by: <span>{`${event.user_id.fname} ${event.user_id.lname}`}</span></p>
          </div>
        </div>
        <div>
          <span>Players</span>
        </div>
        {tabs[this.state.tabIdx]}
      </div>
    )
  }
}

const mapSTP = ({ entities: { events } }, ownProps) => ({
  event: events[ownProps.match.params.id]
});

const mapDTP = dispatch => ({
  fetchEvent: eventId => dispatch(fetchEvent(eventId)),
  fetchParks: () => dispatch(fetchParks()),
  fetchUser: userId => fetchUser(userId),
});

const EventShowContainer = withRouter(connect(mapSTP, mapDTP)(EventShow));

export default EventShowContainer;