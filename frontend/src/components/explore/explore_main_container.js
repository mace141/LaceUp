import { connect } from "react-redux";
import ExploreMain from "./explore_main";
import { fetchParks } from "../../actions/park";
const mapStateToProps = (state) => {
  // debugger;
  return {
    parks: state.entities.parks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // processForm: (user) => dispatch(login(user)),
    fetchParks: () => dispatch(fetchParks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreMain);
