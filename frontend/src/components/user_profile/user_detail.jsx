import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';

const UserDetail = ({ user, openModal, match, currentUserId }) => {
  if (!user) return null;

  const editBtn = match.params.id == currentUserId ? (
    <button onClick={() => openModal('editUser')}>Edit</button>
  ) : null;
  
  return (
    <div className="user-detail">
      <div className="user-avatar">
        <img src={user.avatarUrl} alt="Avatar" />
      </div>
      <div className="user-info">
        <p id="username">{user.username}</p>
        <p className="secondary-info">{`${user.fname} ${user.lname}`}</p>
        <p className="secondary-info">
          Favorite Sports: {user.favorite_sports}
        </p>
        <p className="secondary-info">Home Court: {user.home_court}</p>
        <p className="secondary-info">Bio: {user.bio}</p>
        {editBtn}
      </div>
    </div>
  );
}

const mapSTP = (state, ownProps) => ({
  currentUserId: ownProps.match.params.id
});

const mapDTP = dispatch => ({
  openModal: modal => dispatch(openModal(modal))
});

export default withRouter(connect(mapSTP, mapDTP)(UserDetail));