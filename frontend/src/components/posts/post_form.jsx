import React from 'react';

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.post;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.ensureContent = this.ensureContent.bind(this);
  }

  ensureContent() {
    const { body } = this.state;

    if (body.length) {
      return false;
    } else {
      return true;
    }
  }

  handleInput(e) {
    this.setState({ body: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    
    this.props.processForm(this.state);
    this.setState({ body: "" });
  }

  render() {    
    return (
      <>
        <div>
          <form onSubmit={this.handleSubmit} className='post-form'>
            <div className='post-body'>
              <div>
                <div className='avatar small'>
                  <img src={this.props.user.avatarUrl || window.defaultUser} alt="Profile Pic" className='pfp small'/>
                </div>
                <h2>{this.props.name}</h2>
              </div>
              <div className='textarea'>
                <textarea placeholder='What do you want to talk about?' value={this.state.body} onChange={this.handleInput}></textarea>
              </div>
            </div>
            <footer className='post-form-footer footer'>
              <button className='form-button' disabled={this.ensureContent()}>Post</button>
            </footer>
          </form>
        </div>
      </>
    )
  }
};

export default PostForm;