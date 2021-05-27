import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { receiveEvent } from '../../actions/event_actions';
import { fetchParks } from '../../actions/park';
import { fetchEvent } from '../../util/event_api';
import { fetchUser } from '../../util/user_api';
import TeamsIndex from '../teams/teams_index';

class EventShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIdx: 0,
      event: null,
      eventHost: null
    };
  }

  componentDidMount() {
    const { 
      fetchEvent, fetchParks, fetchUser, receiveEvent, match, dispatch
    } = this.props;

    fetchEvent(match.params.id).then(payload => {
      debugger
      dispatch(receiveEvent(payload));
      fetchUser(payload.data.user_id).then(payload => {
        const user = payload.data;
        const name = `${user.fname} ${user.lname}`;
        this.setState({ eventHost: name });
      });
    });
    fetchParks();
  }

  render() {
    const { event, parks } = this.props;
    if (!parks) return null;
    if (!event) return null; 

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(event.date);

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours}:${minutes}`;

    const tabs = [<TeamsIndex teams={event.teams}/>];
    
    return (
      <div className='event-show'>
        <div className='event-details'>
          <div className='date-time'>
            <p>Date/Time: <span>{`${time}, ${month} ${day}, ${year}`}</span></p>
          </div>
          <div className='location'>
            <p>Location: <span>{parks[event.location_id].name}</span></p>
          </div>
          <div className='sport'>
            <p>Sport: <span>{event.sport}</span></p>
          </div>
          <div className='skill'>
            <p>Skill level: <span>{event.skill}</span></p>
          </div>
          <div className='team-size'>
            <p>Team Size: <span>{event.team_size}</span></p>
          </div>
          <div className='event-host'>
            <p>Hosted by: <span>{this.state.eventHost}</span></p>
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

const mapSTP = ({ entities: { events, parks } }, ownProps) => ({
  event: events[ownProps.match.params.id],
  parks
});

const mapDTP = dispatch => ({
  fetchEvent: eventId => fetchEvent(eventId),
  fetchParks: () => dispatch(fetchParks()),
  fetchUser: userId => fetchUser(userId),
  receiveEvent: payload => receiveEvent(payload),
  dispatch
});

const EventShowContainer = withRouter(connect(mapSTP, mapDTP)(EventShow));

export default EventShowContainer;