import { combineReducers } from 'redux';
import { auth } from './auth';
import { todos, todosMeta } from './todos';

const rootReducer = combineReducers({
    auth,
    todos,
    todosMeta
});

export default rootReducer;
