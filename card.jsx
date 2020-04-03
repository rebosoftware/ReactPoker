import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {key: '', value: this.props.value, cardstate: this.props.cardstate };
  }
 
  render() {


    if(this.state.cardstate == null){
      this.state.cardstate = 'hidden';
    }

    var cardArray = [];
    if(this.state.cardstate === 'hidden'){
      cardArray = ["card_back"];
    }
    else{
      cardArray = [this.state.value];
    }

    var cardImage = cardArray.map(
      function(name){
        var imageName = 'deck4/' + name + '.png';
        return <img src={imageName} width='50' height='85' />;
      }
    )    

    return (
      <span>{cardImage}</span> 
    );
  }
}

//ReactDOM.render(<Card />, document.getElementById('acard'));
