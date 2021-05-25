import React from 'react';

const EventIndexItem = ({ event }) => {

  return (
    <div className='event-item'>
      <div className='date-time'>
        <p>Date/Time: {event.dateTime}</p>
      </div>
      <div className='location'>
        <p>Location: {event.location}</p>
      </div>
      <div className='sport'>
        <p>Sport: {event.sport}</p>
      </div>
      <div className='team-size'>
        <p>Team Size: {event.teamSize}</p>
      </div>
      <div className='skill'>
        <p>Skill level: {event.skill}</p>
      </div>
    </div>
  )
}

export default EventIndexItem;