import React from 'react';
import EventIndexItem from './events_index_item';

const UpcomingEventsIndex = ({ events }) => {

  return (
    <div>
      {events.map(event => (
        <EventIndexItem key={event.id} event={event}/>
      ))}
    </div>
  )
}

export default UpcomingEventsIndex;