import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EventsIndex from '../events/events_index';
import UserDetail from './user_detail';
import { fetchUser } from '../../actions/user';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      tabIdx: 0
    };
  }

  componentDidMount() {
    const { fetchUser, match } = this.props;

    fetchUser(match.params.id);
  }

  render() {
    const { events } = this.props;
    if (!events) return null;

    const newEvents = events.filter(
      event => Date.parse(event.dateTime) > Date.now()
    ).sort((a, b) => Date.parse(a.dateTime) > Date.parse(b.dateTime) ? -1 : 1);

    const oldEvents = events.filter(
      event => Date.parse(event.dateTime) < Date.now()
    ).sort((a, b) => Date.parse(a.dateTime) < Date.parse(b.dateTime) ? -1 : 1);

    const tabs = [<p>Club Component</p>, <EventsIndex events={newEvents}/>, <EventsIndex events={oldEvents}/>];

    return (
      <section className='profile-container'>
        <UserDetail user={this.props.user}/>
        <nav className='tabs'>
          <button onClick={() => this.setState({ tabIdx: 0 })}>Clubs</button>
          <button onClick={() => this.setState({ tabIdx: 1 })}>Schedule</button>
          <button onClick={() => this.setState({ tabIdx: 2 })}>History</button>
        </nav>
        {tabs[this.state.tabIdx]}
      </section>
    )
  }
}

const mapSTP = ({ entities: { users, events }, session: { user } }, ownProps) => {
  return ({
  user: users[ownProps.match.params.id],
  events: Object.values(events)
  // events: Object.values(events).filter(
  //   event => Object.values(event.teams).filter(
  //     team => team.players.includes(user)
  //   )
  // )
})};

const mapDTP = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId))
});

export default withRouter(connect(mapSTP, mapDTP)(Profile));