import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { receiveEvent } from '../../actions/event_actions';
import { fetchParks } from '../../actions/park';
import { fetchTeams } from '../../actions/team';
import { fetchUser } from '../../util/user_api';
import { fetchEvent } from '../../util/event_api';
import TeamsIndex from '../teams/teams_index';
import CreatePostForm from '../posts/create_post_form';
import PostsIndex from '../posts/posts_index';
import { fetchEventsPosts } from '../../actions/post';

class EventShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event: { 
        location_id: { name: null },
        user_id: { fname: null, lname: null }
      },
      teams: this.props.teams
    };
  }

  componentDidMount() {
    const { 
      fetchEvent, fetchTeams, fetchEventsPosts, receiveEvent, dispatch, match 
    } = this.props;
    
    fetchEvent(match.params.id).then(payload => {
      this.setState({ event: payload.data });
      dispatch(receiveEvent(payload));
    });
    fetchTeams();
    fetchEventsPosts(match.params.id);
  }

  render() {
    const { event, teams, posts, user } = this.props;
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
    const time = `${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0'+minutes : minutes} ${hours > 12 ? 'PM' : 'AM'}`;
    
    return (
      <div className="event-show">
        <div className="event-details">
          <div className="date-time">
            <p>
              Date/Time: <span>{`${time}, ${month} ${day}, ${year}`}</span>
            </p>
          </div>
          <div className='location'>
            <p>Location: <span>{this.state.event.location_id.name}</span></p>
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
          <div className='event-host'>
            <p>Hosted by: <Link to={`/users/${this.state.event.user_id._id}`}>
                <span>{`${this.state.event.user_id.fname} ${this.state.event.user_id.lname}`}</span>
              </Link>
            </p>
          </div>
        </div>
        <div>
          <span>Players</span>
        </div>
        <TeamsIndex teams={teams} event={event}/>
        {user ? <CreatePostForm/> : null}
        <PostsIndex posts={posts}/>
      </div>
    );
  }
}

const mapSTP = ({ entities: { events, teams, posts }, session: { user } }, ownProps) => {
  const eventId = ownProps.match.params.id;
  return ({
  event: events[eventId],
  teams: Object.values(teams).filter(team => team.event_id == eventId),
  posts: Object.values(posts).filter(post => post.event_id == eventId),
  user
})};

const mapDTP = dispatch => ({
  fetchEvent: eventId => fetchEvent(eventId),
  receiveEvent: payload => receiveEvent(payload),
  fetchParks: () => dispatch(fetchParks()),
  fetchUser: userId => fetchUser(userId),
  fetchTeams: () => dispatch(fetchTeams()),
  fetchEventsPosts: eventId => dispatch(fetchEventsPosts(eventId)),
  dispatch
});

const EventShowContainer = withRouter(connect(mapSTP, mapDTP)(EventShow));

export default EventShowContainer;
