import { RECEIVE_PARKS } from '../actions/park';

const parksReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_PARKS:
      return action.parks;
    default:
      return state;
  }
};

export default parksReducer;