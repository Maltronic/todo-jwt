import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class TodoCheckbox extends Component {
    render() {
        return (<input type="checkbox" checked={this.props.todo.done} onChange={() => {
            this.props.toggleCallback(this.props.todo)
        }}/>);
    }
}

TodoCheckbox.propTypes = {
    todo: PropTypes.object.isRequired,
    toggleCallback: PropTypes.func.isRequired,
};
