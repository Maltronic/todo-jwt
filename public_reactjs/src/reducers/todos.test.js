import React from 'react';
import * as ActionTypes from "../action_types/index";
import { todos, todosMeta } from './todos';

describe('todos reducer', () => {
    let initialState;

    beforeEach(() => {
        initialState = {};
    });

    it(`default success`, () => {
        const action = {};
        let nextState = todos(initialState, action);
        expect(nextState).toEqual(initialState);
    });

    it(`${ActionTypes.TODO_LIST_REQUEST_DATA} success`, () => {
        const action = {
            type: ActionTypes.TODO_LIST_REQUEST_DATA,
        };
        let nextState = todos({...initialState}, action);
        expect(nextState).toEqual(initialState);
    });

    it(`${ActionTypes.TODO_LIST_RECEIVE_DATA} success`, () => {
        const test_todo = {
                _id: '0123123',
                text: 'test text',
                done: false,
                createdAt: '2017-07-01T18:31:10.075Z',
                priority: 0,
                __v: 0
            };
        const action = {
            type: ActionTypes.TODO_LIST_RECEIVE_DATA,
            todos: [test_todo]
        };

        let nextState = todos(undefined, action);
        expect(nextState).toEqual({[test_todo._id]: test_todo});
    });

    it(`${ActionTypes.TODO_LIST_RECEIVE_DATA} fail`, () => {
        const action = {
            type: ActionTypes.TODO_LIST_RECEIVE_DATA,
        };
        let nextState = todos({...initialState}, action);
        expect(nextState).toEqual(initialState);
    });

    it(`${ActionTypes.TODO_LIST_REQUEST_TOGGLE} success`, () => {
        const action = {
            type: ActionTypes.TODO_LIST_REQUEST_TOGGLE,
        };
        let nextState = todos({...initialState}, action);
        expect(nextState).toEqual(initialState);
    });

    it(`${ActionTypes.TODO_LIST_RECEIVE_TOGGLE} success`, () => {
        const test_todo = {
                _id: '0123123',
                text: 'test text',
                done: true,
                createdAt: '2017-07-01T18:31:10.075Z',
                priority: 0,
                __v: 0
            };
        const action = {
            type: ActionTypes.TODO_LIST_RECEIVE_TOGGLE,
            todo: test_todo
        };

        let nextState = todos(initialState, action);
        expect(nextState).toEqual({[test_todo._id]: {...test_todo}});
    });

    it(`${ActionTypes.TODO_LIST_RECEIVE_TOGGLE} fail`, () => {
        const action = {
            type: ActionTypes.TODO_LIST_RECEIVE_TOGGLE,
        };
        let nextState = todos({...initialState}, action);
        expect(nextState).toEqual(initialState);
    });
});

describe('todosMeta reducer', () => {
    let initialState;

    beforeEach(() => {
        initialState = {
            lastUpdated: null,
            isFetching: false,
        };
    });

    it(`default success`, () => {
        const action = {};
        let nextState = todosMeta(undefined, action);
        expect(nextState).toEqual(initialState);
    });


    it(`${ActionTypes.TODO_LIST_REQUEST_DATA} success`, () => {
        const action = {
            type: ActionTypes.TODO_LIST_REQUEST_DATA,
        };
        let nextState = todosMeta(undefined, action);
        expect(nextState).toEqual({
            ...initialState,
            isFetching: true
        });
    });

    it(`${ActionTypes.TODO_LIST_RECEIVE_DATA} success`, () => {
        const test_date = '2017-07-01T18:31:10.075Z';
        const action = {
            type: ActionTypes.TODO_LIST_RECEIVE_DATA,
            lastUpdated: test_date
        };

        let nextState = todosMeta({...initialState}, action);
        expect(nextState).toEqual({
            ...initialState,
            isFetching: false,
            lastUpdated: test_date
        });
    });
});
