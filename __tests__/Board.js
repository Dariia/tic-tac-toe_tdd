import React from 'react'
import Enzyme , { mount } from 'enzyme';
import Board from "../src/js/components/Board";
import Cell from "../src/js/components/Cell";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { dispatch } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import appReducer, { initialState } from '../src/js/reducers/app';
import { setEmptyBoardData, setBoardData, updatePlayerArr, updateBotArr, setBoardBlock } from "../src/js/actions/app";

Enzyme.configure( { adapter: new Adapter() } );
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

const winBoardData = [
    { value: '0', crossed: '', index: 0 },
    { value: '0', crossed: '', index: 1 },
    { value: '', crossed: '', index: 2 },
    { value: '', crossed: '', index: 3 },
    { value: '', crossed: '', index: 4 },
    { value: '', crossed: '', index: 5 },
    { value: '', crossed: '', index: 6 },
    { value: '', crossed: '', index: 7 },
    { value: '', crossed: '', index: 8 },
];

const store = {
    ...initialState,
    height: 3,
    width: 3,
    gameOn: true,
    dimension: 9,
    boardData,
    emptyBoardData: boardData,
    gameState: 'Game Started',
    playerItem: '0',
    botPlayerItem: 'x',
    playerArr: [],
    botArr: [],
};

function setup() {
    const mockedStore = createStore( appReducer, store );
    const wrapper = mount( <Provider store={ mockedStore } ><Board /></Provider> );
    return { wrapper, mockedStore };
}

function simulateCellClick( wrapper, index ) {
    wrapper.find( '.cell' ).at( index ).simulate( 'click' );
    wrapper.update();
}

function simulateWin( mockedStore, wrapper ) {
    mockedStore.dispatch( setBoardData( winBoardData ) );
    mockedStore.dispatch( updatePlayerArr( 0 ) );
    mockedStore.dispatch( updatePlayerArr( 1 ) );
    simulateCellClick( wrapper, 2 );
}

describe('Board component actions', () => {
    let wrapper, mockedStore;

    beforeEach( () => {
        let config = setup();
        wrapper = config.wrapper;
        mockedStore = config.mockedStore;
    } );

    it( 'should updatePlayerArr, updateBotArr actions', () => {
        mockedStore.dispatch( updatePlayerArr( 77 ) );
        mockedStore.dispatch( updateBotArr( 77 ) );

        expect( mockedStore.getState().playerArr.includes( 77 ) ).toBe( true );
        expect( mockedStore.getState().botArr.includes( 77 ) ).toBe( true );
    } );

    it( 'test setBoardBlock action - block/unblock board', () => {
        mockedStore.dispatch( setBoardBlock( true ) );
        expect( mockedStore.getState().blockedBoard ).toEqual( true );

        mockedStore.dispatch( setBoardBlock( false ) );
        expect( mockedStore.getState().blockedBoard ).toEqual( false );
    } );

    it( 'test setBoardData action', () => {
        mockedStore.dispatch( setBoardData( [ 44 ] ) );

        expect( Array.isArray( mockedStore.getState().boardData ) ).toBe( true );
        expect( mockedStore.getState().boardData.includes( 44 ) ).toBe( true );
    } );

    it( 'test setBoardBlock action - block/unblock board', () => {
        mockedStore.dispatch( setEmptyBoardData( [ 44 ] ) );

        expect( Array.isArray( mockedStore.getState().boardData ) ).toBe( true );
        expect( mockedStore.getState().emptyBoardData.includes( 44 ) ).toBe( true );
    } );
});

describe('Board component', () => {
    let wrapper, mockedStore;

    beforeEach(() => {
        let config = setup();
        wrapper = config.wrapper;
        mockedStore = config.mockedStore;
    });

    it( 'should render self and subcomponents', () => {
        expect( wrapper.find( '.board' ).exists() ).toBe( true );
    } );

    it( 'should render correct cells value', () => {
        simulateCellClick( wrapper, 0 );
        expect( wrapper.find( '.cell' ).at( 0 ).text() ).toEqual( '0' );
    } );

    it( 'should render correct playerArray', () => {
        simulateCellClick( wrapper, 0 );
        expect( wrapper.props().store.getState().playerArr[0]).toEqual(0);
        expect( wrapper.props().store.getState().playerArr.length).toBe(1);

    } );

    it( 'should update botArr after bot click99', async ( done ) => {
        simulateCellClick( wrapper, 0 );
        setTimeout( () => {
            expect( wrapper.props().store.getState().botArr.length ).toBe( 1 );
            done();
        }, 1100 );
    } );

    it( 'should render correct cell value set by bot', async ( done ) => {
        simulateCellClick( wrapper, 0 );

        setTimeout( () => {
            let elIndex = wrapper.props().store.getState().botArr[ 0 ];
            wrapper.update();
            expect( wrapper.find( '.cell' ).at( elIndex ).text() ).toBe( 'x' );
            done();
        }, 1100);
    } );

    it( 'should block board after player click', () => {
        simulateCellClick( wrapper, 0 );
        let blockedBoard = wrapper.props().store.getState().blockedBoard;

        expect( blockedBoard ).toEqual( true );
    } );

    it( 'should unblock board after bot click', async ( done ) => {
        simulateCellClick( wrapper, 0 );
        setTimeout( () => {
            let blockedBoard = wrapper.props().store.getState().blockedBoard;
            expect( blockedBoard ).toEqual( false );
            done();
        }, 1100 );
    } );

    it( 'should cross items on win', async ( done ) => {
        simulateWin( mockedStore, wrapper );

        setTimeout(() => {
            let data = wrapper.props().store.getState().boardData,
                isCrossed = data[ 0 ].crossed && data[ 1 ].crossed && data[ 2 ].crossed;

            expect( isCrossed ).toBe( true );
            done();
        }, 1000 );
    } );

    it( 'should stop game on win', async ( done ) => {
        simulateWin( mockedStore, wrapper );

        setTimeout( () => {
            expect( wrapper.props().store.getState().gameOn ).toBe( false );
            done();
        }, 1000 );
    } );

    it( 'should block board on win', async ( done ) => {
        simulateWin( mockedStore, wrapper );

        setTimeout( () => {
            expect( wrapper.props().store.getState().blockedBoard).toBe( true );
            done();
        }, 1100 );
    } );
} );