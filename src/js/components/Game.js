import React from 'react';
import { connect, dispatch } from 'react-redux';
import { toggleGameOn } from '../actions/app'
import Board from "./Board";
import Blockboard from "./Blockboard";
import GameState from "./GameState";

class Game extends React.Component {
    constructor() {
        super();
        this.gameStart = this.gameStart.bind( this );
    }

    gameStart() {
        let gameHeight = 3,
            gameWidth = 3,
            playerItem = this.getRandomNumber() > 100 ? 'x' : '0',
            boardData = this.initBoardData( gameHeight, gameWidth );

        this.props.handleGameStart( {
            height: gameHeight,
            width: gameWidth,
            gameOn: true,
            dimension: gameHeight * gameWidth,
            boardData: boardData,
            emptyBoardData: boardData,
            gameState: 'Game Started',
            playerItem: playerItem,
            botPlayerItem: ( playerItem == 'x' ) ? '0' : 'x',
        } );
    }

    initBoardData( height, width ) {
        let data = [],
            index = 0;

        for ( let i = 0; i < height; i++ ) {
            for ( let j = 0; j < width; j++ ) {
                let item = { value: '', crossed: '', index, };
                data.push( item );
                index++;
            }
        }

        return data;
    }

    componentWillMount() {
        this.gameStart();
    }

    getRandomNumber( dimension ) {
        return Math.floor( ( Math.random() * 1000 ) + 1 ) % dimension;
    }

    render() {
        return (
            <div className="wrapper">
                <div className="game">
                    <Blockboard />
                    <GameState />
                    <Board />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ( state ) => {
    return {
        height: state.height,
        width: state.width,
        gameOn: state.gameOn,
        completed: state.completed,
        blockedBoard: state.blockedBoard,
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        handleGameStart: ( params ) => {
            dispatch( toggleGameOn( params ) );
        },
    };
}

const GameBoard = connect(
    mapStateToProps,
    mapDispatchToProps,
)( Game );

export default GameBoard;
