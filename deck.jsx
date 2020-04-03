import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cards: null, gameType: 'POKER' };
  }

  render() {
    return (
      <div id="react-deck" className="">
        
        gameType: {this.state.gameType}
        THE DECK

      </div>
    );
  }
}

ReactDOM.render(<Deck />, document.getElementById('adeck'));