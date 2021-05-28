import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { receiveEvent } from '../../actions/event_actions';
import { fetchParks } from '../../actions/park';
import { fetchTeams } from '../../actions/team';
import { fetchUser } from '../../util/user_api';
import { fetchEvent } from '../../util/event_api';
import TeamsIndex from '../teams/teams_index';

class EventShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIdx: 0,
      event: { 
        location_id: { 
          name: null,
          user_id: null
        } 
      },
      num: 0,
      teams: this.props.teams
    };

    this.incrNum = this.incrNum.bind(this);
  }

  componentDidMount() {
    const { fetchEvent, fetchTeams, receiveEvent, dispatch, match } = this.props;
    
    fetchEvent(match.params.id).then(payload => {
      this.setState({ event: payload.data });
      dispatch(receiveEvent(payload));
    });
    fetchTeams();
  }

  incrNum() {
    this.setState({ num: this.state.num + 1 });
  }

  render() {
    const { event, teams } = this.props;
    if (!event) return null; 
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(event.date);

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours}:${minutes}`;
    
    const tabs = [<TeamsIndex teams={teams} incrNum={this.incrNum}/>];
    
    return (
      <div className='event-show'>
        <div className='event-details'>
          <div className='date-time'>
            <p>Date/Time: <span>{`${time}, ${month} ${day}, ${year}`}</span></p>
          </div>
          <div className='location'>
            <p>Location: <span>{this.state.event.location_id.name}</span></p>
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
            <p>Hosted by: <span>{`${this.state.event.user_id.fname} ${this.state.event.user_id.lname}`}</span></p>
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

const mapSTP = ({ entities: { events, teams } }, ownProps) => ({
  event: events[ownProps.match.params.id],
  teams: Object.values(teams).filter(team => team.event_id == ownProps.match.params.id)
});

const mapDTP = dispatch => ({
  fetchEvent: eventId => fetchEvent(eventId),
  receiveEvent: payload => receiveEvent(payload),
  fetchParks: () => dispatch(fetchParks()),
  fetchUser: userId => fetchUser(userId),
  fetchTeams: () => dispatch(fetchTeams()),
  dispatch
});

const EventShowContainer = withRouter(connect(mapSTP, mapDTP)(EventShow));

export default EventShowContainer;