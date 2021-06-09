import React from 'react';
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
    const { user_id, text } = this.state;

    return (
      <div className='post-item'>
        <header>
          <div>
            <img src={ user_id.avatar || defaultUser } alt="Avatar" />
          </div>
          <p>{`${user_id.fname} ${user_id.lname}`}</p>
        </header>
        <p>{text}</p>
      </div>
    );
  }
}

export default PostIndexItem;