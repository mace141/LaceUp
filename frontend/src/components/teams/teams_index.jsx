import React from 'react';
import TeamsIndexItemContainer from './teams_index_item';

const TeamsIndex = ({ user, teams , event}) => {
let flag = false; 
  if (user) {
    teams.forEach(team => {
      if (team.player_id.includes(user.id)) {
        flag = true
        return
      }
    })
  } else {
    flag = true;
  }

  
  return (
    <div className='team-index'> 
      {teams.map(team => (
        <TeamsIndexItemContainer key={team._id} team={team} event={event} flag={flag}/>
      ))}
    </div>
  )
};

export default TeamsIndex;