import React from 'react';
import { connect } from 'react-redux';


class Spot extends React.Component {
  constructor(props) {
    super(props);
    debugger
    this.state = { user: null };
  }

  componentDidMount() {
    const { spot, fetchUser, receiveUser, dispatch } = this.props;
    debugger
    if (spot != 'empty') {
      fetchUser(spot).then(payload => {
        const user = payload.data[0];
        this.setState({ user });
        dispatch(receiveUser(payload));
      })
    }
  }

  render() {
    debugger
    const user = this.state.user;
    if (!user) return <span>__________</span>;
    
    return (
      <span>{`${user.fname} ${user.lname}`}</span>
    )
  }
}

export default Spot;
