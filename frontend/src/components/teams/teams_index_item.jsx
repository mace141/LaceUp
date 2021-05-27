import React from 'react';
import { connect } from 'react-redux';
import { addPlayer } from '../../actions/team';
import Spot from './spot';

class TeamsIndexItem extends React.Component {

  render() {
    const { team, addPlayer, currentUserId } = this.props;

    let teamSpots = [];
    for (let i = 0; i < team.numPlayers; i++) {
      let playerId;
      if (team.player_id[i]) {
        if (typeof team.player_id[i] == 'string') {
          playerId = team.player_id[i]
          teamSpots.push(playerId);
        } else {
          playerId = team.player_id[i]._id;
          teamSpots.push(playerId);
        }
      } else {
        teamSpots.push('empty');
      }
    }
    
    return (
      <div className='team-item'>
        <h1>{team.name}</h1>
        <h2>Players Needed: {team.numPlayers - team.player_id.length}</h2>
        <button onClick={() => addPlayer(team._id, currentUserId)}>Join Team</button>
        <div className='player-slots'>
          {teamSpots.map(spot => (
            <Spot spot={spot}/>
          ))}
        </div>
      </div>
    );
  }
}

const mapSTP = ({ session: { user } }) => {
  let id;
  if (user) id = user.id;
  return ({
  currentUserId: id
})};

const mapDTP = dispatch => ({
  addPlayer: (team_id, player_id) => dispatch(addPlayer(team_id, player_id))
});

const TeamsIndexItemContainer = connect(mapSTP, mapDTP)(TeamsIndexItem);

export default TeamsIndexItemContainer;