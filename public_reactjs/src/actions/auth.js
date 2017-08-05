import * as ActionTypes from '../action_types/index';
import { api as todoApi } from "../middleware/api";

export const register = (username, password) => {
    return dispatch => {
        dispatch({type: ActionTypes.AUTH_REQUEST_REGISTER});
        return todoApi.post('/register', {
            username,
            password
        }).then((response) => {
            dispatch({type: ActionTypes.AUTH_RECEIVE_REGISTER, registered: true});
        }).catch((response) => {
            dispatch({type: ActionTypes.AUTH_RECEIVE_ERROR, response: response});
        });
    }
};

export const login = (username, password) => {
    return dispatch => {
        dispatch({type: ActionTypes.AUTH_REQUEST_LOGIN});
        return todoApi.post('/login', {
            username,
            password
        }).then((response) => {
            dispatch({type: ActionTypes.AUTH_RECEIVE_LOGIN, username});
        }).catch((response) => {
            dispatch({type: ActionTypes.AUTH_RECEIVE_ERROR, response});
        });
    }
};

export const logout = () => {
    return dispatch => {
        dispatch({type: ActionTypes.AUTH_REQUEST_LOGOUT});
        dispatch({type: ActionTypes.AUTH_RECEIVE_LOGOUT});
    }
};
