import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Card} from './card.jsx';

export class DealerHand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {key: '', index: -1, value: '', suite: '', state: '' };
  }
 
  render() {
    return (
      <div id="dealer-hand" className="">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    );
  }
}

ReactDOM.render(<DealerHand />, document.getElementById('dealer-hand'));