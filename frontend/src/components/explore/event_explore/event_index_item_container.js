import { connect } from "react-redux";
import EventIndexItem from "./event_index_item";
import { fetchUser } from "../../../actions/user";
import { openModal } from "../../../actions/modal_actions";
const mapStateToProps = (state, ownProps) => {
  return {
    event: ownProps.event,
    park: ownProps.park,
    host: state.entities.users[ownProps.event.user_id],
    isCurrentUser: state.session.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    openModal: (modal) => dispatch(openModal(modal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventIndexItem);
