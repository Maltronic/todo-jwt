import * as ActionTypes from "../action_types/index";

const initialState = {
    username: null,
    registered: false,
    isFetching: false
};

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.AUTH_REQUEST_REGISTER:
            return {...state, isFetching: true};
        case ActionTypes.AUTH_RECEIVE_REGISTER:
            return {...state, registered: (action.registered)? action.registered : false, isFetching: false};
        case ActionTypes.AUTH_REQUEST_LOGIN:
            return {...state, isFetching: true};
        case ActionTypes.AUTH_RECEIVE_LOGIN:
            return {...state, username: (action.username)? action.username : null, isFetching: false};
        case ActionTypes.AUTH_RECEIVE_LOGOUT:
            return {...state, username: null, isFetching: false};
        default:
            return state;
    }
};
