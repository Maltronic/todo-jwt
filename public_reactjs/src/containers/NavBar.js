import React from 'react';
import LoginPanel from "../components/LoginPanel";
import PropTypes from 'prop-types';
import {Navbar, Nav} from 'react-bootstrap';

const NavBar = (props) => {
    const isRegisteredPhrase = (props.auth && props.auth.registered)? "User Registered" : null;
    const isLoggedInPhrase = (props.auth && props.auth.username)? `Logged in as ${props.auth.username}` : null;
    return (<Navbar>
        <Navbar.Text>Your Todos</Navbar.Text>
        <Nav className="pull-right list-inline">
            <LoginPanel submitCallback={props.loginCallback} completedPhrase={isLoggedInPhrase} title="Login:" />
            <LoginPanel submitCallback={props.registerCallback} completedPhrase={isRegisteredPhrase} title="Register:" />
        </Nav>
    </Navbar>);
};

NavBar.propTypes = {
    auth: PropTypes.object.isRequired,
    loginCallback: PropTypes.func.isRequired,
    registerCallback: PropTypes.func.isRequired
};

export default NavBar;
