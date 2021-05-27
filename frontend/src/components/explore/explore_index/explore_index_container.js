import { connect } from "react-redux";
import ExploreIndexItem from "./explore_index_item";

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchEvents: () => dispatch(fetchEvents()),
    // closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreIndexItem);
