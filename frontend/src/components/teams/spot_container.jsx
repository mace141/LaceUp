import {connect} from 'react-redux'
import { fetchUser } from '../../util/user_api';
import { receiveUser } from '../../actions/user';
import Spot from './spot'

const mapSTP = (state, ownProps) => {
  
  return {
    event: ownProps.event,
  };
};
const mapDTP = dispatch => ({
  fetchUser: userId => fetchUser(userId),
  receiveUser: payload => receiveUser(payload),
  dispatch
});


export default connect(mapSTP, mapDTP)(Spot);