import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateUser } from '../../actions/user';
import { closeModal } from '../../actions/modal_actions';
import { fetchParks } from '../../actions/park';

class EditUserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...this.props.user };

    this.handleFile = this.handleFile.bind(this);
    this.handleSports = this.handleSports.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCourts = this.handleCourts.bind(this);
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSports(e) {
    const options = this.state.favorite_sports.split(', ');

    if (e.target.checked) {
      options.push(e.target.value);
    } else {
      let index = options.indexOf(e.target.value);
      options.splice(index, 1);
    }

    this.setState({ favorite_sports: options.join(', ') });
  }

  handleCourts(e) {
    const options = this.state.home_court;

    if (e.target.selected) {
      options.push(e.target.value);
    } else {
      let index = options.indexOf(e.target.value);
      options.splice(index, 1);
    }

    this.setState({ home_courts: options });
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
    
    // formData.append('user[id]', this.state._id);
    // formData.append('user[avatar]', this.state.avatar);
    // formData.append('user[username]', this.state.username);
    // formData.append('user[bio]', this.state.bio);
    // formData.append('user[favoriteSports]', this.state.favorite_sports);
    // formData.append('user[homeCourts]', this.state.home_court);
    
    this.props.updateUser(this.state);
    document.getElementById('avatar-input').value = "";
    this.props.closeModal();
  }

  render() {
    
    return (
      <div className='modal edit-user-form'>
        <h1>Update Info</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <div>
                <img src={this.state.avatarUrl} alt="Avatar"/>
                <input type="file" id='avatar-input' accept='image/*' onChange={this.handleFile}/>
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
                <input type='checkbox' value="Basketball" onChange={this.handleSports}/>Basketball
                <input type='checkbox' value="Soccer" onChange={this.handleSports}/>Soccer
                <input type='checkbox' value="Tennis" onChange={this.handleSports}/>Tennis
                <input type='checkbox' value="Handball" onChange={this.handleSports}/>Handball
              </div>
              <div>
                <label>Home Courts</label>
                <select onChange={this.handleCourts}>
                  {this.props.parks.map(park => (
                    <option value={park.name}>{park.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapSTP = ({ entities: { users, parks } }, ownProps) => {
  return ({
  user: users[ownProps.location.pathname.slice(7)],
  parks
})};

const mapDTP = dispatch => ({
  updateUser: user => dispatch(updateUser(user)),
  closeModal: () => dispatch(closeModal()),
  fetchParks: () => dispatch(fetchParks())
});

export default withRouter(connect(mapSTP, mapDTP)(EditUserForm));