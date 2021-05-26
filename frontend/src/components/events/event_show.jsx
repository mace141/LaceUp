import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchEvent } from '../../actions/event_actions';
import TeamsIndex from '../teams/teams_index';

class EventShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIdx: 0,
      event: null
    };
  }

  componentDidMount() {
    this.props.fetchEvent(this.props.match.params.id).then(res => console.log(res));
    this.setState({ tabIdx: 0 });
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

    const tabs = [<TeamsIndex teams={event.teams}/>];
    
    return (
      <div className='event-show'>
        <div className='event-details'>
          <div className='date-time'>
            <p>Date/Time: <span>{`${time}, ${month} ${day}, ${year}`}</span></p>
          </div>
          <div className='location'>
            <p>Location: <span>{event.location_id}</span></p>
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
        </div>
        <p>Players</p>
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
  fetchEvent: eventId => dispatch(fetchEvent(eventId))
});

const EventShowContainer = withRouter(connect(mapSTP, mapDTP)(EventShow));

export default EventShowContainer;