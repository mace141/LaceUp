import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { addPlayer } from "../../actions/team";
import { openModal } from "../../actions/modal_actions";
import SpotContainer from "./spot_container";

class TeamsIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamSize: props.team.length,
    };
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    const { team, addPlayer, currentUserId, openModal } = this.props;

    if (currentUserId) {
      addPlayer(team._id, currentUserId);
      window.location.reload();
    } else {
      openModal("login");
    }
  }

  render() {
    const { team, event, currentUserId, flag } = this.props;

    let teamSpots = [];
    for (let i = 0; i < team.numPlayers; i++) {
      let playerId;
      if (team.player_id[i]) {
        if (typeof team.player_id[i] == "string") {
          playerId = team.player_id[i];
          teamSpots.push(playerId);
        } else {
          playerId = team.player_id[i]._id;
          teamSpots.push(playerId);
        }
      } else {
        teamSpots.push("empty");
      }
    }

    const joinBtn =
      flag || team.numPlayers - team.player_id.length < 1 ? null : (
        <button className="join-team" onClick={this.handleAdd}>
          Join Team
        </button>
      );

    return (
      <div className="team-item">
        <h1>{team.name}</h1>
        <h2>
          Players Needed:
          {team.numPlayers - team.player_id.length}
        </h2>
        {joinBtn}
        <div className="player-slots">
          {teamSpots.map((spot, i) => (
            <SpotContainer key={i} spot={spot} event={event} team={team} />
          ))}
        </div>
      </div>
    );
  }
}

const mapSTP = ({ session: { user } }) => {
  let id;

  if (user) id = user.id;
  return {
    currentUserId: id,
  };
};

const mapDTP = (dispatch) => ({
  addPlayer: (team_id, player_id) => dispatch(addPlayer(team_id, player_id)),
  openModal: (modal) => dispatch(openModal(modal)),
});

const TeamsIndexItemContainer = connect(mapSTP, mapDTP)(TeamsIndexItem);

export default withRouter(TeamsIndexItemContainer);
