import React from 'react';
import TeamsIndexItemContainer from './teams_index_item';

const TeamsIndex = ({ teams , event}) => {

  return (
    <div className='team-index'> 
      {teams.map(team => (
        <TeamsIndexItemContainer key={team._id} team={team} event={event}/>
      ))}
    </div>
  )
};

export default TeamsIndex;