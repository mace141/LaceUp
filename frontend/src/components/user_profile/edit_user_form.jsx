import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateUser } from '../../actions/user';
import { closeModal } from '../../actions/modal_actions';
import { fetchParks } from '../../actions/park';

class EditUserForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      ...this.props.user, 
      home_court: this.props.parks[0].name
    };

    this.handleFile = this.handleFile.bind(this);
    this.handleSports = this.handleSports.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSports(e) {
    const options = this.state.favorite_sports.split(', ');
    
    if (e.target.selected) {
      options.push(e.target.value);
    } else {
      let index = options.indexOf(e.target.value);
      options.splice(index, 1);
    }
    
    let sports = options.join(', ');
    if (sports[0] === ',') sports = sports.slice(2);

    this.setState({ favorite_sports: sports });
  }

  handleFile(e) {
    const file = e.target.files[0];
    
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.setState({ avatar: file, avatarUrl: fileReader.result });
    };

    if (file) {
      fileReader.readAsDataURL(file);
    }
    document.getElementById('avatar-input').value = "";
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    
    this.props.updateUser(this.state);
    document.getElementById('avatar-input').value = "";
    this.props.closeModal();
  }

  render() {
    
    return (
      <div className='modal edit-user-form'>
        <h1>Update Info</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <div className='edit-avatar-section'>
              <div className='avatar'>
                <img src={this.state.avatarUrl} alt="Avatar"/>
                <input type="file" id='avatar-input' accept='image/*' onChange={this.handleFile}/>
              </div>
              <span onClick={() => document.getElementById('avatar-input').click()}>New Avatar</span>
            </div>
            <div>
              <label>Username</label>
              <input type="text" value={this.state.username} onChange={this.handleInput('username')}/>
            </div>
          </div>
          <div>
            <textarea placeholder="Enter your bio" onChange={this.handleInput('bio')}>{this.state.bio}</textarea>
            <div>
              <label>Favorite Sports</label>
              <select multiple>
                <option value="Basketball" onClick={this.handleSports}>Basketball</option>
                <option value="Soccer" onClick={this.handleSports}>Soccer</option>
                <option value="Tennis" onClick={this.handleSports}>Tennis</option>
                <option value="Baseball" onClick={this.handleSports}>Baseball</option>
                <option value="Football" onClick={this.handleSports}>Football</option>
                <option value="Handball" onClick={this.handleSports}>Handball</option>
              </select>
            </div>
            <div>
              <label>Home Courts</label>
              <select onChange={this.handleInput('home_court')}>
                {this.props.parks.map(park => (
                  <option value={park.name}>{park.name}</option>
                ))}
              </select>
            </div>
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

const mapSTP = ({ entities: { users, parks } }, ownProps) => {
  return ({
  user: users[ownProps.location.pathname.slice(7)],
  parks: Object.values(parks)
})};

const mapDTP = dispatch => ({
  updateUser: user => dispatch(updateUser(user)),
  closeModal: () => dispatch(closeModal()),
  fetchParks: () => dispatch(fetchParks())
});

export default withRouter(connect(mapSTP, mapDTP)(EditUserForm));