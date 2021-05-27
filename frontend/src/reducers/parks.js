import { RECEIVE_PARKS } from '../actions/park';

const parksReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_PARKS:
      let nextState = { ...state };
      action.parks.forEach(park => nextState[park._id] = park);
      return nextState;
    default:
      return state;
  }
};

export default parksReducer;