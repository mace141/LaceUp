import React from 'react';

class TeamsIndexItem extends React.Component {

  render() {
    const { team } = this.props;
    let teamSpots = [];
    for (let i = 0; i < team.numPlayers; i++) {
      if (team.player_id[i]) {
        teamSpots.push(<span>{team.player_id[i]}</span>);
      } else {
        teamSpots.push(<span className='empty-slot'>__________</span>);
      }
    }
    return (
      <div className='team-item'>
        <h1>{team.name}</h1>
        <h2>Players Needed: {team.numPlayers - team.player_id.length}</h2>
        <button>Join Team</button>
        <div className='player-slots'>
          {teamSpots}
        </div>
      </div>
    );
  }
}

export default TeamsIndexItem;