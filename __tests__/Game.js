import React from 'react'
import { mount } from 'enzyme';
import Game from "../src/js/components/Game";
import GameState from "../src/js/components/GameState";
import { mockStore } from 'redux-mock-store';
import appReducer, { initialState } from '../src/js/reducers/app';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {dispatch}  from 'react-redux';
import {toggleGameOn} from '../src/js/actions/app';

const boardData = [
    { value: '', crossed: '', index: 0 },
    { value: '', crossed: '', index: 1 },
    { value: '', crossed: '', index: 2 },
    { value: '', crossed: '', index: 3 },
    { value: '', crossed: '', index: 4 },
    { value: '', crossed: '', index: 5 },
    { value: '', crossed: '', index: 6 },
    { value: '', crossed: '', index: 7 },
    { value: '', crossed: '', index: 8 },
];

const newState = {
    height: 3,
    width: 3,
    gameOn: true,
    dimension: 9,
    boardData,
    emptyBoardData: boardData,
    gameState: 'Game Started',
    playerItem: '0',
    botPlayerItem: 'x',
};

function setup() {
    const mockedStore = createStore( appReducer, initialState, );
    const wrapper = mount( <Provider store={ mockedStore } ><Game /></Provider> );
    return { wrapper, mockedStore };
}

describe( 'Game component', () => {
    let store, wrapper;

    beforeEach( () => {
        let config = setup();
        wrapper = config.wrapper;
        store = config.mockedStore;
    } );

    it('render the GAME component', () => {
        expect( wrapper.length ).toEqual( 1 );
    });

    it( 'check start game action on dispatching', () => {
        store.dispatch( toggleGameOn( newState ) );
        expect( store.getState().gameOn ).toBe( true );
    } );

    it( 'game state label changes', () => {
        let store = createStore( appReducer, newState, ),
            gameState = mount( <Provider store={ store }><GameState /></Provider> );

        expect( gameState.find( '.game-info' ).text() ).toEqual( 'Game Started' );

    } );
});
