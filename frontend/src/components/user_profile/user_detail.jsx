import React from 'react';
import { connect } from 'react-redux';

const UserDetail = ({ user, parks, openModal }) => {

  return (
    <div>
      <div>
        <img src={user.avatarUrl} alt="Avatar"/>
      </div>
      <div>
        <p>{`${user.fname} ${user.lname}`}</p>
        <p>Favorite Sport{user.sports.length > 1 ? 's' : ''}: {user.sports.length ? user.sports.join(', ') : 'None'}</p>
        <p>Home Court{parks.length > 1 ? 's' : ''}: {parks.length ? parks.join(', ') : 'None'}</p>
        <button onClick={() => openModal('editUser')}>Edit</button>
      </div>
    </div>
  )
}

const mapSTP = ({ entities: { users, parks }, session: { currentUser } }) => ({
  parks: users[currentUser].homeCourt.map(parkId => parks[parkId])
});

export default connect(mapSTP)(UserDetail);