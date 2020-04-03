import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Card} from './card.jsx';

export class DealerHand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hand: [] };
  }
 
  render() {

    var val1 = '1.0';
    var state1 = 'visible';

    return (
      <div id="dealer-hand" className="">
        <Card value={val1} cardstate={state1}/>&nbsp;
        <Card value="2.0" cardstate="visible"/>&nbsp;
        <Card />&nbsp;
        <Card />&nbsp;
        <Card />
      </div>
    );
  }
}

//ReactDOM.render(<DealerHand />, document.getElementById('dh'));