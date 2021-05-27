import React from 'react';
import TeamsIndexItemContainer from './teams_index_item';

const TeamsIndex = ({ teams }) => {
  return (
    <div className='team-index'> 
      {teams.map(team => (
        <TeamsIndexItemContainer team={team}/>
      ))}
    </div>
  )
};

export default TeamsIndex;