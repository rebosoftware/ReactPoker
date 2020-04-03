import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Card} from './card.jsx';

export class PlayerHand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {key: '', index: -1, value: '', suite: '', state: '' };
  }
 
  render() {
    return (
      <div id="dealer-hand" className="">
        <Card />&nbsp;
        <Card />&nbsp;
        <Card />&nbsp;
        <Card />&nbsp;
        <Card />
      </div>
    );
  }
}

//ReactDOM.render(<PlayerHand />, document.getElementById('ph'));