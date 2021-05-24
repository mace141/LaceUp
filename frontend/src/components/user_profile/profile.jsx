import React from 'react';
import { connect } from 'react-redux';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      tab: 0
    };
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
  }

  render() {
    const { events } = this.props;
    // const newEvents = 
    const tabs = [<UpcomingEventsIndex events={this.props.events}/>, <PastEventsIndex/>]
    return (
      <section className='profile-container'>
        <UserDetail user={this.props.user}/>
        <nav className='tabs'>
          <button onClick={() => this.setState({ tab: 0 })}>Clubs</button>
          <button onClick={() => this.setState({ tab: 1 })}>Schedule</button>
          <button onClick={() => this.setState({ tab: 2 })}>History</button>
        </nav>
      </section>
    )
  }
}

const mapSTP = ({ entities: { users, events, clubs }, session: { currentUser } }, ownProps) => ({
  user: users[ownProps.match.params.id],
  events: Object.values(events).filter(event => Object.keys(event.players).includes(currentUser))
});

const mapDTP = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId))
});

export default connect(mapSTP, mapDTP)(Profile);