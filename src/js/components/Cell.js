import React from 'react';

class Cell extends React.Component {
    render() {
        let className = this.props.item.crossed ? 'crossed' : '' ;

        return <div ref="cell" onClick={ this.props.onClick } className={ 'cell ' + className }>{ this.props.item.value }</div>;
    }
}

export default Cell;