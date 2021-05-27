import { RECEIVE_EVENTS, RECEIVE_EVENT, REMOVE_EVENT } from '../actions/event_actions';
import { RECEIVE_USER } from '../actions/user';

const eventsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_EVENTS:
            let nextState = { ...state };
            action.events.forEach(e => nextState[e._id] = e);
            return nextState;
        case RECEIVE_EVENT:
            newState[action.payload.data._id] = action.payload.data;
            return newState; 
        case REMOVE_EVENT:
            delete newState[action.eventId];
            return newState;
        case RECEIVE_USER:
            action.payload.data[1].forEach(e => newState[e._id] = e);
            return newState;
        default:
            return state;
    }
};

export default eventsReducer;