import React from 'react';
import Cell from './Cell';
import { connect } from "react-redux";
import { gameState, gameOnOff, setEmptyBoardData, setBoardData, updatePlayerArr, updateBotArr, setBoardBlock } from "../actions/app";

class Dashboard extends React.Component {
    constructor() {
        super();
    }

    getCleanedArray( data ) {
        let arr = [];

        data.map(
            dataitem => {
                ( dataitem[ 'value' ] == '' ) && arr.push( dataitem );
        } );
        return arr;
    }

    checkResult() {
        let combinations = [
            [ 0, 3, 6 ],
            [ 3, 4, 5 ],
            [ 6, 7, 8 ],
            [ 0, 1, 2 ],
            [ 1, 4, 7 ],
            [ 2, 5, 8 ],
            [ 0, 4, 8 ],
            [ 2, 4, 6 ],
        ],
        botWin = this.checkWinCombo( this.props.state.botArr, combinations ),
        playerWin = this.checkWinCombo( this.props.state.playerArr, combinations );

        ( botWin || playerWin ) && this.props.handleGameStart( false ) && this.crossArea( combinations[ this.winCombo ] );
        botWin && this.props.setGameState( 'Game over! You loose!' );
        playerWin && this.props.setGameState( 'Game over! You win!' );

        return ( botWin || playerWin );
    }

    checkWinCombo( arr = [], combinations ) {
        for ( let i = 0; i < combinations.length; i++ ) {
            if ( arr.indexOf( combinations[ i ][ 0 ] ) >= 0 ) {
                if ( arr.indexOf( combinations[ i ][ 1 ] ) >= 0 ) {
                    if ( arr.indexOf( combinations[ i ][ 2 ] ) >= 0 ) {
                        this.winCombo = i;
                        return true;
                    }
                }
            }
        }
        return false;
    }

    crossArea( area ) {
        let updatedData = this.props.state.boardData;
        for ( let i = 0; i < area.length; i++ ) {
            updatedData[ area[ i ] ].crossed = true;
        }
        this.props.handleSetBoardData( updatedData );
    }

    botPlayerClick() {
        let items = this.props.state.emptyBoardData;

        if ( items.length ) {
            let item = items[ this.getRandom( items.length ) ];

            this.handleCellClick( item, this.props.state.botPlayerItem );
            this.props.handleBotArr( item.index );
            !this.checkResult() && this.props.handleBlockBoard( false );
        }
    }

    playerClick( item ) {
        this.handleCellClick( item, this.props.state.playerItem );
        this.props.handlePlayerArr( item.index );
        if ( !this.checkResult() ) {
            this.props.handleBlockBoard( true );
            setTimeout( this.botPlayerClick.bind( this ), 1000 );
        }
    }

    getRandom( qty ) {
        return Math.floor( ( Math.random() * qty ));
    }

    handleCellClick( item, playerItem ) {
        if ( ( item.length && ( item.value !== '' ) && !this.props.state.emptyBoardData.length ) || !this.props.state.gameOn ) {
            return;
        }

        this.props.state.boardData[ item.index ].value = playerItem;
        let updatedData = [...this.props.state.boardData];
        this.props.handleSetBoardData( updatedData );

        let emptyUpdatedData = this.getCleanedArray( this.props.state.boardData );
        this.props.handleSetEmptyBoardData( emptyUpdatedData );
    }

    renderBoard() {
        return this.props.state.boardData.map( ( dataitem ) => {
            return (
                <div key={ this.getRandom( 10000 ) }>
                    <Cell onClick={ () => this.playerClick( dataitem ) } item={ dataitem } />
                    {( this.props.state.boardData[ this.props.state.width - 1 ] === dataitem ) ? <div className="clear" /> : ""}
                </div>
            );
        } );
    }

    render() {
        return <div className="board">{ this.renderBoard() }</div>;
    }
}

const mapStateToProps = ( state, ownProps ) => {
    return {
        state,
        traverseBoard: ownProps.traverseBoard,
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        setGameState: ( params ) => dispatch( gameState( params ) ),
        handleGameStart: ( params ) => dispatch( gameOnOff( params ) ),
        handleSetEmptyBoardData: ( params ) => dispatch( setEmptyBoardData( params ) ),
        handleSetBoardData: ( params ) => dispatch( setBoardData( params ) ),
        handlePlayerArr: ( params ) => dispatch( updatePlayerArr( params ) ),
        handleBotArr: ( params ) => dispatch( updateBotArr( params ) ),
        handleBlockBoard: ( params ) => dispatch( setBoardBlock( params ) ),
    };
}

const Board = connect(
    mapStateToProps,
    mapDispatchToProps,
)( Dashboard );

export default Board;
