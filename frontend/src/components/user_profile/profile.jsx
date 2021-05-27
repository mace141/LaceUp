import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EventsIndex from '../events/profile_events_index';
import UserDetail from './user_detail';
import { fetchUser } from '../../actions/user';
import { fetchParks } from '../../actions/park';
import { fetchEventsByUser } from '../../util/event_api';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      tabIdx: 0,
      events: []
    };

    this.toggleTabs = this.toggleTabs.bind(this);
  }

  componentDidMount() {
    const { fetchUser, fetchParks, fetchEventsByUser, match } = this.props;

    fetchUser(match.params.id);
    fetchParks();
    fetchEventsByUser(match.params.id).then(
      payload => this.setState({ events: payload.data }) 
    );
  }

  toggleTabs(num) {
    const tabs = document.getElementsByClassName('tabs');
    for (let tab of tabs) {
      tab.style.fontWeight = 400;
    }
    document.getElementById(`tab${num}`).style.fontWeight = 600;
  }

  render() {
    const { events } = this.state;
    
    const newEvents = events.filter(
      event => Date.parse(event.date) > Date.now()
    ).sort((a, b) => Date.parse(a.date) > Date.parse(b.date) ? 1 : -1);

    const oldEvents = events.filter(
      event => Date.parse(event.date) <= Date.now()
    ).sort((a, b) => Date.parse(a.date) < Date.parse(b.date) ? 1 : -1);
    
    const tabs = [<EventsIndex events={newEvents}/>, <EventsIndex events={oldEvents}/>, <p>Club Component</p>];
    
    return (
      <section className='profile-container'>
        <UserDetail user={this.props.user}/>
        <nav className='profile-tabs'>
          <div onClick={() => {
                        this.setState({ tabIdx: 0 });
                        this.toggleTabs(0);
                      }} className='tabs' id='tab0' style={{fontWeight:600}}>
            <button>Schedule</button>
          </div>
          <div onClick={() => {
                        this.setState({ tabIdx: 1 });
                        this.toggleTabs(1);
                      }} className='tabs' id='tab1'>
            <button>History</button>
          </div>
          <div onClick={() => {
                        this.setState({ tabIdx: 2 });
                        this.toggleTabs(2);
                      }} className='tabs' id='tab2'>
            <button>Clubs</button>
          </div>
        </nav>
        {tabs[this.state.tabIdx]}
      </section>
    )
  }
}

const mapSTP = ({ entities: { users, events }, session: { user } }, ownProps) => {
  return ({
    user: users[ownProps.match.params.id]
  })
};

const mapDTP = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId)),
  fetchParks: () => dispatch(fetchParks()),
  fetchEventsByUser: userId => fetchEventsByUser(userId)
});

export default withRouter(connect(mapSTP, mapDTP)(Profile));