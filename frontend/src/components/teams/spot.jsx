import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../util/user_api';
import { receiveUser } from '../../actions/user';

class Spot extends React.Component {
  constructor(props) {
    super(props);

    this.state = { user: null };
  }

  componentDidMount() {
    const { spot, fetchUser, receiveUser, dispatch } = this.props;
    if (spot != 'empty') {
      fetchUser(spot).then(payload => {
        const user = payload.data[0];
        this.setState({ user });
        dispatch(receiveUser(payload));
      })
    }
  }

  render() {
    const user = this.state.user;
    if (!user) return <span>__________</span>;
    
    return (
      <span>{`${user.fname} ${user.lname}`}</span>
    )
  }
}

const mapDTP = dispatch => ({
  fetchUser: userId => fetchUser(userId),
  receiveUser: payload => receiveUser(payload),
  dispatch
});

export default connect(null, mapDTP)(Spot);