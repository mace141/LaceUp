import React from 'react';
import EventIndexItem from './events_index_item';

const EventsIndex = ({ events }) => {

  return (
    <div className='profile-events-index'>
      {events.map(event => (
        <EventIndexItem key={event.id} event={event}/>
      ))}
    </div>
  )
}

export default EventsIndex;