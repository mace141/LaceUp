import React from "react";
import TeamsIndexItemContainer from "./teams_index_item";

const TeamsIndex = ({ user, teams, event }) => {
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
  // debugger;
  return (
    <div className="team-index">
      {teams.map((team, i) => (
        <TeamsIndexItemContainer
          key={i}
          team={team}
          event={event}
          flag={flag}
        />
      ))}
    </div>
  );
};

export default TeamsIndex;
