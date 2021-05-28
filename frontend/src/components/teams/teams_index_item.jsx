import React from 'react';
import { connect } from 'react-redux';
import { addPlayer } from '../../actions/team';
import SpotContainer from './spot_container';

class TeamsIndexItem extends React.Component {

  constructor(props){
    super(props)
    this.state = ({
      teamSize: props.team.length
    })
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleAdd(){
    const { team, addPlayer, currentUserId } = this.props;
    addPlayer(team._id, currentUserId)
    window.location.reload()
  }
  render() {
    const { team, event } = this.props;

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
    debugger
    return (
      <div className='team-item'>
        <h1>{team.name}</h1>
        <h2>Players Needed: {team.numPlayers - team.player_id.length}</h2>
        <button onClick={this.handleAdd}>Join Team</button>
        <div className='player-slots'>
          {teamSpots.map(spot => (
            <SpotContainer spot={spot} event={event} team={team}/>
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