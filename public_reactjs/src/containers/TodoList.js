import React, { Component } from 'react';
import TodoCheckbox from "../components/TodoCheckbox";

export default class TodoList extends Component {

    render() {
        const todos = this.props.todos;
        return (
            <table className="todoTable table table-responsive">
                <thead>
                <tr>
                    <th>Todo Item</th>
                    <th>Is Complete?</th>
                </tr>
                </thead>
                <tbody>
                {todos && Object.keys(todos).map((id, i) => {
                    return (
                        <tr key={i}>
                            <td>{todos[id].text}</td>
                            <td>
                                <TodoCheckbox todo={todos[id]} toggleCallback={this.props.toggleCallback}/>
                            </td>
                        </tr>
                    )
                })}
                {todos && !Object.keys(todos).length &&
                    <tr>
                        <td colSpan="2">Please login or register first.</td>
                    </tr>
                }
                </tbody>
            </table>
        );
    }
}
