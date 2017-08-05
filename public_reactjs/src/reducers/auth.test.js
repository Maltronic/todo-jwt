import React from 'react';
import * as ActionTypes from "../action_types/index";
import { auth as reducer } from './auth';

describe('auth reducer', () => {
    let initialState;

    beforeEach(() => {
        initialState = {
            username: null,
            registered: false,
            isFetching: false
        };
    });

    it(`default success`, () => {
        const action = {};
        let nextState = reducer(initialState, action);
        expect(nextState).toEqual(initialState);
    });

    it(`${ActionTypes.AUTH_REQUEST_REGISTER} success`, () => {
        const action = {
            type: ActionTypes.AUTH_REQUEST_REGISTER,
        };
        let nextState = reducer(initialState, action);
        expect(nextState).toEqual({
            ...initialState,
            isFetching: true
        });
    });

    it(`${ActionTypes.AUTH_RECEIVE_REGISTER} success`, () => {
        const action = {
            type: ActionTypes.AUTH_RECEIVE_REGISTER,
            registered: true
        };
        let nextState = reducer({...initialState, isFetching: true}, action);
        expect(nextState).toEqual({
            ...initialState,
            registered: true
        });
    });

    it(`${ActionTypes.AUTH_RECEIVE_REGISTER} fail`, () => {
        const action = {
            type: ActionTypes.AUTH_RECEIVE_REGISTER,
        };
        let nextState = reducer({...initialState, isFetching: true}, action);
        expect(nextState).toEqual(initialState);
    });

    it(`${ActionTypes.AUTH_REQUEST_LOGIN} success`, () => {
        const action = {
            type: ActionTypes.AUTH_REQUEST_LOGIN,
        };
        let nextState = reducer(initialState, action);
        expect(nextState).toEqual({
            ...initialState,
            isFetching: true
        });
    });

    it(`${ActionTypes.AUTH_RECEIVE_LOGIN} success`, () => {
        const test_username = "TEST";
        const action = {
            type: ActionTypes.AUTH_RECEIVE_LOGIN,
            username: test_username
        };
        let nextState = reducer({...initialState, isFetching: true}, action);
        expect(nextState).toEqual({
            ...initialState,
            username: test_username
        });
    });

    it(`${ActionTypes.AUTH_RECEIVE_LOGIN} fail`, () => {
        const action = {
            type: ActionTypes.AUTH_RECEIVE_LOGIN,
        };
        let nextState = reducer({...initialState, isFetching: true}, action);
        expect(nextState).toEqual(initialState);
    });

    it(`${ActionTypes.AUTH_REQUEST_LOGOUT} success`, () => {
        const action = {
            type: ActionTypes.AUTH_REQUEST_LOGOUT,
        };
        let nextState = reducer(initialState, action);
        expect(nextState).toEqual(initialState);
    });
});
