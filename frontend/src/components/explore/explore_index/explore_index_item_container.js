import { connect } from "react-redux";
import ExploreIndexItem from "./explore_index_item";

const mapStateToProps = (state, ownProps) => {
  return {
    parks: ownProps.parks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // processForm: (user) => dispatch(login(user)),
    // otherForm: () => dispatch(openModal("signup")),
    // closeModal: () => dispatch(closeModal()),
    // login: (user) => dispatch(login(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreIndexItem);
