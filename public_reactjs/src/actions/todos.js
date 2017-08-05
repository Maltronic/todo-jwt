import * as ActionTypes from '../action_types/index';
import { api as todoApi } from "../middleware/api";

export const fetchTodoListData = () => {
    return (dispatch, getState) => {
        dispatch({type: ActionTypes.TODO_LIST_REQUEST_DATA});
        return todoApi.get('/todo').then((response) => {
            dispatch({type: ActionTypes.TODO_LIST_RECEIVE_DATA, todos: response.data, lastUpdated: new Date()});
        }).catch((response) => {
            dispatch({type: ActionTypes.AUTH_RECEIVE_ERROR, response: response});
        });
    }
};


export const toggleTodo = (todo) => {
    return (dispatch, getState) => {
        dispatch({type: ActionTypes.TODO_LIST_REQUEST_TOGGLE});
        return todoApi.put('/todo/' + todo._id, {...todo, done: !todo.done}).then((response) => {
            dispatch({type: ActionTypes.TODO_LIST_RECEIVE_TOGGLE, todo: response.data});
        }).catch((response) => {
            dispatch({type: ActionTypes.AUTH_RECEIVE_ERROR, response: response});
        });
    }
};
