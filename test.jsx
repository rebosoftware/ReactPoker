import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {ReactDeck} from './reactpoker.js';


export class ReactPokerTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {index: -1, deck: [], temp: '' };

  }

  htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }


  /*
  function renderCards(deck) {
    if (deck.length > 0) {      
        return deck.map((card, index) => (
            <Card key={index} card={card} />
        ));
    }
    else return [];
  }

  const Card = ({card}) => {
      return ( 
          <card key={card.id}>
              <a href={article.link}>{article.title}</a>
              <p>{article.description}</p>
          </card>
      );
  };
*/

 
  render() {
    
    let dck = new ReactDeck();
    this.state.deck = dck.shuffledDeck;
    

    var elements = this.state.deck.map(
      function(name){
        //return <li>{card}</li>;
        var imageName = 'deck4/' + name + '.png';
        return <img src={imageName} width='50' height='85' />;
      }
    ) 

  
    for (var i=0; i < this.state.deck.length; i++) {
         this.state.temp += "<img src='deck4/" + this.state.deck[i] + ".png' width='50' height='85'/>";
    }


    
    return (
      <div id="react-test" className="">
        This is  a shuffled deck<br/>{elements}
      </div>
    );
  }
}

ReactDOM.render(<ReactPokerTest />, document.getElementById('atest'));
