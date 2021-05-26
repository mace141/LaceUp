import React from 'react';

const EventIndexItem = ({ event }) => {

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const date = new Date(event.date);

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const time = `${hours}:${minutes}`

  return (
    <div className='profile-event-item'>
      <div className='date-time'>
        <p>Date/Time: <span>{`${time}, ${month} ${day}, ${year}`}</span></p>
      </div>
      <div className='location'>
        <p>Location: <span>{event.location_id}</span></p>
      </div>
      <div className='sport'>
        <p>Sport: <span>{event.sport}</span></p>
      </div>
      <div className='team-size'>
        <p>Team Size: <span>{event.team_size}</span></p>
      </div>
      <div className='skill'>
        <p>Skill level: <span>{event.skill}</span></p>
      </div>
    </div>
  )
}

export default EventIndexItem;