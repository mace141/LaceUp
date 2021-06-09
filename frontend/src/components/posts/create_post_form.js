import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createPost } from '../../actions/post';
import PostForm from './post_form';

const mapSTP = ({ session: user }, ownProps) => ({
  post: {
    user_id: user.user.id,
    text: "",
    event_id: ownProps.match.params.id
  },
  user: user.user,
  name: `${user.user.fname} ${user.user.lname}`
});

const mapDTP = dispatch => ({
  createPost: post => dispatch(createPost(post))
});

export default withRouter(connect(mapSTP, mapDTP)(PostForm));