import React from 'react';
import { connect } from 'react-redux';
import { updatePost } from '../../actions/post';

class EditPostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.post;
    this.originalPost = this.props.post;

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit() {
    this.props.updatePost(this.state);
    this.setState({ text: "" });
    this.props.toggleEdit();
  }

  ensureChange() {
    if (this.state == this.originalPost) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div className='edit'>
        <textarea value={this.state.text} onChange={this.handleInput}/>
        <p className='edit-post-btns'>
          <button className='save-post-edit' onClick={this.handleSubmit} disabled={this.ensureChange()}>Save Changes</button>
          <button className='cancel-post-edit' onClick={this.props.toggleEdit}>Cancel</button>
        </p>
      </div>
    )
  }
}

const mapDTP = dispatch => ({
  updatePost: post => dispatch(updatePost(post))
});

export default connect(null, mapDTP)(EditPostForm);