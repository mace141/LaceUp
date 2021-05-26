import { connect } from "react-redux";
import EventIndexItem from "./event_index_item";
import { fetchUser } from "../../../actions/user";
const mapStateToProps = (state, ownProps) => {
  return {
    event: ownProps.event,
    park: ownProps.park,
    host: state.entities.users[ownProps.event.user_id],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    // closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventIndexItem);
