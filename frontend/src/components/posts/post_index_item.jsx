import React from 'react';
import { connect } from 'react-redux';
import { deletePost } from '../../actions/post';
import defaultUser from '../../style/assets/defaultUser.png';
import EditPostForm from './edit_post_form';

class PostIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      ...props.post,
      edit: false,
      drop: false
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.clicked = this.clicked.bind(this);
    this.leave = this.leave.bind(this);
    this.setEdit = this.setEdit.bind(this);
  }

  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  clicked() {
    this.setState({ drop: true });
  }

  leave() {
    this.setState({ drop: false });
  }

  setEdit(newText) {
    this.setState({ text: newText });
  }

  render() {
    const { user_id, text, newPost, edit, drop, _id } = this.state;
    const { avatar, user, deletePost } = this.props;

    const avatarUrl = newPost ? avatar : user_id.avatar;
    const name = newPost ? `${user.fname} ${user.lname}` : `${user_id.fname} ${user_id.lname}`;

    const editForm = edit ? (
      <EditPostForm toggleEdit={this.toggleEdit} post={this.state} setEdit={this.setEdit}/>
    ) : (
      <p className="post-item-text">{text}</p>
    );
    
    let dropdown;
    
    if (user_id._id == user.id || newPost) {
      dropdown = (
        <button onFocus={this.clicked} onBlur={this.leave} className='dropdown-btn'>
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Simple_icon_ellipsis.svg" alt="ellipsis"/>
          <ul className={'post-dropdown ' + (drop ? 'reveal' : 'hide')}>
            <li onClick={this.toggleEdit}><i className="far fa-edit"></i>Edit</li>
            <li onClick={() => deletePost(_id)}><i className="far fa-trash-alt"></i>Delete</li>
          </ul>
        </button>
      );
    }

    return (
      <div className='post-item'>
        <header>
          <div className='avatar'>
            <img src={ avatarUrl || defaultUser } alt="Avatar" />
          </div>
          <p>{name}</p>
        </header>
        {editForm}
        {dropdown}
      </div>
    );
  }
}

const mapSTP = ({ session: { user } }) => ({
  avatar: user.avatar,
  user
});

const mapDTP = dispatch => ({
  deletePost: postId => dispatch(deletePost(postId))
});

export default connect(mapSTP, mapDTP)(PostIndexItem);