import React from 'react';
import defaultUser from '../../style/assets/defaultUser.png';

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.post;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.ensureContent = this.ensureContent.bind(this);
  }

  ensureContent() {
    const { text } = this.state;

    if (text.length) {
      return false;
    } else {
      return true;
    }
  }

  handleInput(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    
    this.props.createPost(this.state.event_id, this.state);
    this.setState({ text: "" });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='post-form'>
        <h1>Create a post</h1>
        <div className='post-body'>
          <div className='subhead'>
            <div className='avatar'>
              <img src={this.props.user.avatar || defaultUser} alt="Profile Pic" className='pfp'/>
            </div>
            <h2>{this.props.name}</h2>
          </div>
          <div className='textarea'>
            <textarea placeholder='What do you want to talk about?' value={this.state.text} onChange={this.handleInput}></textarea>
          </div>
        </div>
        <footer>
          <button className='form-button' disabled={this.ensureContent()}>Post</button>
        </footer>
      </form>
    )
  }
};

export default PostForm;