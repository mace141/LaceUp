import React from "react";
import TeamsIndexItemContainer from "./teams_index_item";

class TeamsIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = { flag: false };

    this.setFlagTrue = this.setFlagTrue.bind(this);
  }

  setFlag() {
    const { user, teams } = this.props;
    let flag = false;

    if (user) {
      teams.forEach((team) => {
        if (team.player_id.includes(user.id)) {
          flag = true;
          return;
        }
      });
    } else {
      flag = false;
    }

    return flag;
  }
  
  setFlagTrue() {
    this.setState({ flag: true });
  }

  render() {
    const { teams, event } = this.props;
    let flag = this.setFlag() || this.state.flag;
    
    return (
      <div className="team-index">
        {teams.map((team, i) => (
          <TeamsIndexItemContainer
            key={i}
            team={team}
            event={event}
            flag={flag}
            setFlagTrue={this.setFlagTrue}
          />
        ))}
      </div>
    );
  };
}

export default TeamsIndex;
