import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateUser, updateUserImage } from '../../actions/user';
import { closeModal } from '../../actions/modal_actions';
import { fetchParks } from '../../actions/park';
import defaultUser from '../../style/assets/defaultUser.png';

class EditUserForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      ...this.props.user, 
      home_court: this.props.parks[0].name,
      favorite_sports: ""
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
    
    let index = options.indexOf(e.target.value);
    if (index < 0) {
      options.push(e.target.value);
    } 
    
    let sports = options.join(', ');
    if (sports[0] === ',') sports = sports.slice(2);
    
    this.setState({ favorite_sports: sports });
  }

  handleFile(e) {
    const file = e.target.files[0];
    
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.setState({ image: file, avatar: fileReader.result });
    };

    if (file) {
      fileReader.readAsDataURL(file);
    }
    document.getElementById('avatar-input').value = "";
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.image) {
      const formData = new FormData();
      formData.append('image', this.state.image);
      
      this.props.updateUserImage(this.state._id, formData);
    }
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
                <img src={this.state.avatar || defaultUser} alt="Avatar"/>
                <input type="file" id='avatar-input' accept='image/*' onChange={this.handleFile}/>
              </div>
              <span onClick={() => document.getElementById('avatar-input').click()}>New Avatar</span>
            </div>
            <div className='username'>
              <label>Username:</label>
              <input type="text" value={this.state.username} onChange={this.handleInput('username')}/>
            </div>
          </div>
          <div className="form-bottom">
            <label className="bio-label">Bio:</label>
            <textarea placeholder="Enter your bio" onChange={this.handleInput('bio')} value={this.state.bio}></textarea>
            <div className='sports-courts'>
              <div className='sports'>
                <label>Favorite Sports:</label><br/>
                <select multiple className='sports'>
                  <option value="Basketball" onClick={this.handleSports}>Basketball</option>
                  <option value="Soccer" onClick={this.handleSports}>Soccer</option>
                  <option value="Tennis" onClick={this.handleSports}>Tennis</option>
                  <option value="Baseball" onClick={this.handleSports}>Baseball</option>
                  <option value="Football" onClick={this.handleSports}>Football</option>
                  <option value="Handball" onClick={this.handleSports}>Handball</option>
                  <option value="Frisbee" onClick={this.handleSports}>Frisbee</option>
                  <option value="Running" onClick={this.handleSports}>Running</option>
                  <option value="Cycling" onClick={this.handleSports}>Cycling</option>
                  <option value="Volleyball" onClick={this.handleSports}>Volleyball</option>
                  <option value="Workout" onClick={this.handleSports}>Workout</option>
                </select>
              </div>
              <div className='courts'>
                <label>Home Court:</label><br/>
                <select onChange={this.handleInput('home_court')}>
                  {this.props.parks.map(park => (
                    <option value={park.name}>{park.name}</option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <div className='submit'>
            <button type='submit'>Submit</button>
          </div>
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
  updateUserImage: (userId, formData) => dispatch(updateUserImage(userId, formData)),
  closeModal: () => dispatch(closeModal()),
  fetchParks: () => dispatch(fetchParks())
});

export default withRouter(connect(mapSTP, mapDTP)(EditUserForm));