import { GAME_ON, GAME_STATE, EMPTY_BOARD, START_GAME, BOARD_DATA, BOARD_BLOCKED, UPD_PLAYER_ARR, UPD_BOT_ARR } from '../actions/app';

function appReducer( state = initialState, action ) {
    switch ( action.type ) {
        case START_GAME:
            return Object.assign( {}, state, action.state );
        case GAME_ON:
            return Object.assign( {}, state, {
                gameOn: action.gameOn,
            } );
        case GAME_STATE:
            return Object.assign( {}, state, {
                gameState: action.gameStateInfo,
            } );
        case EMPTY_BOARD:
            return Object.assign( {}, state, {
                emptyBoardData: action.emptyBoardData,
            } );
        case BOARD_DATA:
            return Object.assign( {}, state, {
                boardData: action.boardData,
            } );
        case BOARD_BLOCKED:
            return Object.assign( {}, state, {
                blockedBoard: action.blocked,
            } );
        case UPD_PLAYER_ARR:
            let playerArr = Array.from(state.playerArr);
            playerArr.push(action.item);
            return Object.assign( {}, state, { playerArr } );
        case UPD_BOT_ARR:
            let botArr = Array.from(state.botArr);
            botArr.push( action.item );
            return Object.assign( {}, state, { botArr } );
        default:
            return state;
    }
}

export const initialState = {
    completed: true,
    gameOn: false,
    gameState: 'Start new game',
    height: 0,
    width: 0,
    emptyBoardData: [],
    boardData: [],
    dimension: 0,
    playerItem: 'x',
    botPlayerItem: '0',
    botArr: [],
    playerArr: [],
    blockedBoard: false,
}

export default appReducer;
