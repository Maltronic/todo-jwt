import PropTypes from 'prop-types';
import React, {Component} from 'react';

export default class LoginPanel extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            username: '',
            password: ''
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        return this.props.submitCallback(this.state.username, this.state.password);
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const content = (this.props.completedPhrase) ? this.displayCompleted() : this.displayForm();
        return (
            <form onSubmit={this.handleSubmit}
                  className="form-signin pull-right">
                <div><h4>{this.props.title}</h4></div>
                {content}
            </form>
        );
    }

    displayCompleted = () => (
        <div>{this.props.completedPhrase}</div>
    );

    displayForm = () => (
        <div>
            <div>
                <label>User name:</label><br/>
                <input type="text" name="username" placeholder="username..." value={this.state.username}
                       onChange={this.handleChange}/>
            </div>
            <div>
                <label>Password:</label><br/>
                <input type="password" name="password" placeholder="password..." value={this.state.password}
                       onChange={this.handleChange}/>
            </div>
            <input className="btn btn-primary" type="submit" value="submit"/>
        </div>
    );
}

LoginPanel.propTypes = {
    completedPhrase: PropTypes.string,
    submitCallback: PropTypes.func.isRequired,
    title: PropTypes.string
};
