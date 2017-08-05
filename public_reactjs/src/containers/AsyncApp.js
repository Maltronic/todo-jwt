import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TodoList from './TodoList';
import NavBar from './NavBar';
import * as ActionCreators from '../actions/index';

export class AsyncApp extends Component {
    render() {
        const {onRegisterSubmit, onLoginSubmit, onTodoToggle, auth, todos, todosMeta} = this.props;

        return (
            <div className="container">
                <NavBar loginCallback={onLoginSubmit} registerCallback={onRegisterSubmit} auth={auth}/>
                <div className="jumbotron">
                    <TodoList todos={todos} todosMeta={todosMeta} toggleCallback={onTodoToggle}/>
                </div>
                <div>
                    <hr/>

                    <footer>
                        <p>React Todo List</p>
                    </footer>
                </div>
            </div>
        );
    }
}

AsyncApp.propTypes = {
    // State
    auth: PropTypes.object.isRequired,
    selectedTodo: PropTypes.object,
    todos: PropTypes.object,
    todosMeta: PropTypes.object,

    // Actions
    onRegisterSubmit: PropTypes.func.isRequired,
    onLoginSubmit: PropTypes.func.isRequired,
    onTodoToggle: PropTypes.func.isRequired,
    fetchTodoList: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        todos: state.todos,
        todosMeta: state.todosMeta
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onRegisterSubmit: (username, password) => {
            return dispatch(ActionCreators.auth.register(username, password)).then(() => {
                return dispatch(ActionCreators.todos.fetchTodoListData());
            });

        },
        onLoginSubmit: (username, password) => {
            dispatch(ActionCreators.auth.login(username, password)).then(() => {
                return dispatch(ActionCreators.todos.fetchTodoListData());
            });
        },
        onTodoToggle: (todo) => {
            dispatch(ActionCreators.todos.toggleTodo(todo))
        },
        fetchTodoList: () => {
            dispatch(ActionCreators.todos.fetchTodoListData())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AsyncApp);
