/*
 * action types
 */

export const GAME_ON = 'GAME_ON';
export const GAME_STATE = 'GAME_STATE';
export const EMPTY_BOARD = 'EMPTY_BOARD';
export const START_GAME = 'START_GAME';
export const BOARD_DATA = 'BOARD_DATA';
export const BOARD_BLOCKED = 'BOARD_BLOCKED';
export const UPD_PLAYER_ARR = 'UPD_PLAYER_ARR';
export const UPD_BOT_ARR = 'UPD_BOT_ARR';

/*
 * action creators
 */
export function toggleGameOn( state ) {
    return {
        type: START_GAME,
        state,
    };
}

export function gameOnOff( gameOn ) {
    return {
        type: GAME_ON,
        gameOn,
    };
}

export function gameState( gameStateInfo ) {
    return {
        type: GAME_STATE,
        gameStateInfo,
    };
}

export function setBoardData( boardData ) {
    return {
        type: BOARD_DATA,
        boardData,
    };
}

export function setEmptyBoardData( emptyBoardData ) {
    return {
        type: EMPTY_BOARD,
        emptyBoardData,
    };
}

export function setBoardBlock( blocked ) {
    return {
        type: BOARD_BLOCKED,
        blocked,
    };
}

export function updatePlayerArr( item ) {
    return {
        type: UPD_PLAYER_ARR,
        item,
    };
}

export function updateBotArr( item ) {
    return {
        type: UPD_BOT_ARR,
        item,
    };
}