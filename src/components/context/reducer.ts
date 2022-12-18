import { Action, RSVP } from './models';

export const initialState: RSVP = {
    names: '',
    email: '',
    phoneNumber: '',
    attending: 'no',
    expectedPartyCount: 0,
    diet: '',
};

export const reducer = (state = initialState, action: Action) => {
    if (action.type === 'RSVP_SUBMITTED') {
        return action.payload.rsvp;
    }
    if (action.type === 'UPDATE_USER_VALUES') {
        return {
            ...state,
            ...action.payload,
        };
    }
    return state;
};
