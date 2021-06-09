import React from 'react';
import { connect } from 'react-redux';
import defaultUser from '../../style/assets/defaultUser.png';

class PostIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      ...props.post,
      edit: false
    };

    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  render() {
    const { user_id, text, newPost } = this.state;
    const avatarUrl = newPost ? this.props.avatar : user_id.avatar;
    
    return (
      <div className='post-item'>
        <header>
          <div className='avatar'>
            <img src={ avatarUrl || defaultUser } alt="Avatar" />
          </div>
          <p>{`${user_id.fname} ${user_id.lname}`}</p>
        </header>
        <p>{text}</p>
      </div>
    );
  }
}

const mapSTP = ({ session: { user } }) => ({
  avatar: user.avatar
});

export default connect(mapSTP)(PostIndexItem);