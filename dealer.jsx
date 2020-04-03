
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class Dealer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {deck: null, gameType: 'POKER' };
  }

  render() {
    return (
      <div id="react-dealer" className="">
        
        gameType: {this.state.gameType}
        THE DEALER

      </div>
    );
  }
}

ReactDOM.render(<Dealer />, document.getElementById('adealer'));

/*

walkToTable
setupEquipment
waitForPlayers

game:
-----
chooseDeck
shuffleDeck
playGame
repeat...


draw poker:
------
dealHoleRound
		The Deal
		5 hidden hole cards to each player face down

checkBetFold - not implemented
		
collectDiscards
		each player can discard up to 3 cards
		
dealDrawRound
		The Draw Round


holdem:
-------
dealHole
		2 cards down for each player

checkBetFold

deal3SharedCards
		3 cards on the board face up

checkBetFold

dealTurn
		1 card faceup

checkBetFold

dealRiver
		1 card faceup

checkBetFold




*/

