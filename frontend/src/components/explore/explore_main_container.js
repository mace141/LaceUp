import { connect } from "react-redux";
import ExploreMain from "./explore_main";
import { fetchParks } from "../../actions/park";
const mapStateToProps = (state, ownProps) => {
  return {
    parks: state.entities.parks,
    preSelected: ownProps.history.location.state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // processForm: (user) => dispatch(login(user)),
    fetchParks: () => dispatch(fetchParks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreMain);
