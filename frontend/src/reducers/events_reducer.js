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
            newState[action.event.id] = action.event;
            return newState; 
        case REMOVE_EVENT:
            delete newState[action.eventId];
            return newState;
        case RECEIVE_USER:
            return { ...state, ...action.user.events };
        default:
            return state;
    }
};

export default eventsReducer;