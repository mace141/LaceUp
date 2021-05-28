import {connect} from 'react-redux'
import { fetchUser } from '../../util/user_api';
import { receiveUser } from '../../actions/user';
import Spot from './spot'

const mapSTP = (state, ownProps) => {
  debugger
  return {
    event: ownProps.event,
    // teams: Object.values(state.entities.teams).filter(
    //   (team) => team.event_id == ownProps.match.params.id
    // ),
  };
};
const mapDTP = dispatch => ({
  fetchUser: userId => fetchUser(userId),
  receiveUser: payload => receiveUser(payload),
  dispatch
});


export default connect(mapSTP, mapDTP)(Spot);