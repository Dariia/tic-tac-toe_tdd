import React from 'react'
import { shallow } from 'enzyme';
import Cell from "../src/js/components/Cell";
import { connect, dispatch } from 'react-redux';

describe( 'Shallow Cell', () => {
    let wrapper,
        item = { value: '0', crossed: true, index: 0 };

    beforeEach( () => {
        wrapper = shallow( <Cell item={ item } /> );
    })

    it('render the Cell component', () => {
        expect( wrapper.length ).toEqual( 1 );
    })

    it( 'check crossed cell', () => {
        const cellElem = wrapper.find( '.cell' );

        expect( cellElem.text() ).toEqual( '0' );
        expect( cellElem.hasClass( 'crossed' ) ).toBe( true );
    })
});
