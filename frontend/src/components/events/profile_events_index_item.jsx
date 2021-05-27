import React from 'react';
import { connect } from 'react-redux';

const EventIndexItem = ({ event, parks }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(event.date);

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const time = `${hours}:${minutes}`;

  return (
    <div className='profile-event-item'>
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
      <div className='num-teams'>
        <p># of Teams: <span>{event.num_teams}</span></p>
      </div>
    </div>
  )
}

const mapSTP = ({ entities: { parks } }) => ({
  parks
});

export default connect(mapSTP)(EventIndexItem);