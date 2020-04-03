import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//import {Dealer} from './dealer.jsx';
//import {Deck} from './deck.jsx';
//import {Card} from './card.jsx';
//import {Random} from './random.jsx';
//import {ReactPokerTest} from './test.jsx';
//import {DealerHand} from './dealerhand.jsx';
//import {PlayerHand} from './playerhand.jsx';
import {RPDeck} from './rpPoker.js';
import {Table} from './table.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3 className="App-title">Welcome to React Poker!</h3>
        </header>
        <p className="App-intro"></p>
      </div>
    );
  }
}

export default App;
