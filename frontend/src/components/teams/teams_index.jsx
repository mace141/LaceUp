import React from 'react';
import TeamsIndexItem from './teams_index_item';

const TeamsIndex = ({ teams }) => {
  return (
    <div className='team-index'> 
      {teams.map(team => (
        <TeamsIndexItem team={team}/>
      ))}
    </div>
  )
};

export default TeamsIndex;