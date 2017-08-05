import * as ActionTypes from "../action_types/index";

export const todos = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.TODO_LIST_REQUEST_DATA:
            return state;
        case ActionTypes.TODO_LIST_RECEIVE_DATA:
            if (action.todos) {
                state = action.todos.reduce((todos, todo) => {
                    todos[todo._id] = todo;
                    return todos;
                }, {});
            }
            return state;
        case ActionTypes.TODO_LIST_REQUEST_TOGGLE:
            return state;
        case ActionTypes.TODO_LIST_RECEIVE_TOGGLE:
            if (action.todo && action.todo._id) {
                return {
                    ...state,
                    [action.todo._id]: action.todo
                };
            }
            return state;
        default:
            return state;
    }
};


export const todosMeta = (state = {lastUpdated: null, isFetching: false}, action) => {
    switch (action.type) {
        case ActionTypes.TODO_LIST_REQUEST_DATA:
            return {...state, isFetching: true};
        case ActionTypes.TODO_LIST_RECEIVE_DATA:
            return {
                ...state,
                isFetching: false,
                lastUpdated: action.lastUpdated
            };
        default:
            return state;
    }
};
