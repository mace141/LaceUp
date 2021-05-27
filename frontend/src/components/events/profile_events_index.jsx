import React from 'react';
import { Link } from 'react-router-dom';
import EventIndexItem from './profile_events_index_item';

const EventsIndex = ({ events }) => {
  
  return (
    <div className='profile-events-index'>
      <ul>
        {events.map(event => (
          <Link to={`/events/${event._id}`}>
            <EventIndexItem key={event._id} event={event}/>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default EventsIndex;