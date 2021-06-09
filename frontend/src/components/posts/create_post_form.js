import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createPost } from '../../actions/post';
import PostForm from './post_form';

const mapSTP = ({ session: { user } }, ownProps) => ({
  post: {
    user_id: user.id,
    text: "",
    event_id: ownProps.match.params.id
  },
  user,
  name: `${user.fname} ${user.lname}`
});

const mapDTP = dispatch => ({
  createPost: (eventId, post) => dispatch(createPost(eventId, post))
});

export default withRouter(connect(mapSTP, mapDTP)(PostForm));