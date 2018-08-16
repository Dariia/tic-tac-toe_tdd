import React from 'react';
import { connect } from "react-redux";

const BlockboardElem = ( props ) => {
    let className = props.gameOn ? '' : 'blocked';
    return ( props.gameOn && !props.blockedBoard ) ? '' : <div className={ 'block-board ' + className }></div>;
};

const mapStateToProps = ( state ) => {
    return {
        gameOn: state.gameOn,
        blockedBoard: state.blockedBoard,
    };
};

const Blockboard = connect( mapStateToProps, {} )( BlockboardElem );

export default Blockboard;