import React from 'react';
import { connect } from 'react-redux';

class EditUserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.user;

    this.handleFile = this.handleFile.bind(this);
    this.handleSports = this.handleSports.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCourts = this.handleCourts.bind(this);
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSports(e) {
    const options = this.state.favoriteSports;

    if (e.target.checked) {
      options.push(e.target.value);
    } else {
      let index = options.indexOf(e.target.value);
      options.splice(index, 1);
    }

    this.setState({ favoriteSports: options });
  }

  handleCourts(e) {
    const options = this.state.homeCourts;

    if (e.target.selected) {
      options.push(e.target.value);
    } else {
      let index = options.indexOf(e.target.value);
      options.splice(index, 1);
    }

    this.setState({ homeCourts: options });
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

    formData.append('user[id]', this.state.id);
    formData.append('user[avatar]', this.state.avatar);
    formData.append('user[username]', this.state.username);
    formData.append('user[bio]', this.state.bio);
    formData.append('user[favoriteSports]', this.state.favoriteSports);
    formData.append('user[homeCourts]', this.state.homeCourts);

    this.props.updateUser(formData);
    document.getElementById('avatar-input').value = "";
    this.props.closeModal();
  }

  render() {

    return (
      <div className='modal'>
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
                <select multiple onChange={this.handleCourts}>
                  {this.props.parks.map(park => (
                    <option value={park.name}></option>
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

const mapSTP = ({ entities: { users, parks }, session: { currentUser } }) => ({
  user: users[currentUser],
  parks
});

const mapDTP = dispatch => ({
  updateUser: user => dispatch(updateUser(user)),
  closeModal: () => dispatch(closeModal())
});

export default connect(mapSTP, mapDTP)(EditUserForm);