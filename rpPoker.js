import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//used for seeding random number
import MersenneTwister from 'mersenne-twister';

//used to rank hands

//import PokerEvaluator from 'poker-evaluator';

//class to handle the deck
export class RPDeck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentDeck: this.unShuffledDeck };

  }

  //render, todo: look at making this a 'pure' component
  //so that we can ignore lifecycle events but still keep
  //the benefits of being a react component
  render() {
    return (<div></div>);
  }

  getDetailsDeck(){

   let eDeck = [ {key:"1.0", value: "14", suite: "1", suiteName: "Spades", 
                name: "Ace", fullName: "Ace of Spades"},

                 {key:"2.0", value: "2", suite: "1",  suiteName: "Spades",
                name: "Duece", fullName: "Duece of Spades"},

                 {key:"3.0", value: "3", suite: "1",  suiteName: "Spades",
                name: "3", fullName: "3 of Spades"},

                 {key:"4.0", value: "4", suite: "1",  suiteName: "Spades",
                name: "4", fullName: "4 of Spades"},

                 {key:"5.0", value: "5", suite: "1",  suiteName: "Spades",
                name: "5", fullName: "5 of Spades"},

                 {key:"6.0", value: "6", suite: "1",  suiteName: "Spades",
                name: "6", fullName: "6 of Spades"},

                 {key:"7.0", value: "7", suite: "1",  suiteName: "Spades",
                name: "7", fullName: "7 of Spades"},

                 {key:"8.0", value: "8", suite: "1",  suiteName: "Spades",
                name: "8", fullName: "8 of Spades"},

                 {key:"9.0", value: "9", suite: "1",  suiteName: "Spades",
                name: "9", fullName: "9 of Spades"},

                 {key:"10.0", value: "10", suite: "1",  suiteName: "Spades",
                name: "10", fullName: "10 of Spades"},

                 {key:"11.0", value: "11", suite: "1",  suiteName: "Spades",
                name: "Jack", fullName: "Jack of Spades"},

                 {key:"12.0", value: "12", suite: "1",  suiteName: "Spades",
                name: "Queen", fullName: "Queen of Spades"},

                 {key:"13.0", value: "13", suite: "1",  suiteName: "Spades",
                name: "King", fullName: "King of Spades"},

               ];

   return eDeck;

  }

  //shuffle an array in place
  shuffle (cards) {

    var i=0;
    var j=0;
    var temp=null;

    //no seed for now
    var generator = new MersenneTwister();
    var seed = generator.random();
  
    //loop over cards and swap them
    for (i=cards.length-1; i>0; i-=1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = cards[i];

      cards[i] = cards[j];
      cards[j] = temp;
     }
   }

   //get a full unshuffled deck of 52 cards
   get unShuffledDeck(){

    //deck of 52 cards 
    //1.0-13.0   A,2,3..K of spades
    //14.0-26.0  A,2,3..K of hearts
    //27.0-39.0  A,2,3..K of clubs
    //40.0-52.0  A,2,3..K of diamonds
    let deck = ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0",
    "11.0","12.0","13.0","14.0","15.0","16.0","17.0","18.0","19.0","20.0",
    "21.0","22.0","23.0","24.0","25.0","26.0","27.0","28.0","29.0","30.0",
    "31.0","32.0","33.0","34.0","35.0","36.0","37.0","38.0","39.0","40.0",
    "41.0","42.0","43.0","44.0","45.0","46.0","47.0","48.0","49.0","50.0",
    "51.0","52.0"];
      
     return deck;
   }

   //get a full shuffled deck of 52 cards
   startingDeck(){
    
     //deck of ordered 52 cards 
    let deckEmpty = ["card_back","card_back","card_back","card_back","card_back","card_back",
    "card_back","card_back","card_back","card_back",
    "card_back","card_back","card_back","card_back","card_back","card_back","card_back","card_back",
    "card_back","card_back",
    "card_back","card_back","card_back","card_back","card_back","card_back","card_back",
    "card_back","card_back","card_back",
    "card_back","card_back","card_back","card_back","card_back","card_back","card_back",
    "card_back","card_back","card_back",
    "card_back","card_back","card_back","card_back","card_back","card_back","card_back",
    "card_back","card_back","card_back",
    "card_back","card_back"];
     
     //sets the current deck
     this.shuffleNewDeck();

     return deckEmpty;
   }


   //get a full shuffled deck of 52 cards
   shuffleNewDeck(){
    
     //deck of ordered 52 cards 
     let deck = this.unShuffledDeck;
     
     //shuffle deck in place
     this.shuffle(deck);

     this.state.currentDeck =  deck;
     return this.state.currentDeck;
   }

   //get a full shuffled deck of 52 cards
   shuffleCurerentDeck(){

     //deck of ordered 52 cards 
     let deck = this.state.currentDeck;

     //shuffle deck in place
     this.shuffle(deck);

     this.state.currentDeck = deck; 
     return this.state.currentDeck;

     //navigate to api and shuffle again thinking it will be a 
     //random ammount of time to do the nav
   //  var thisShuffle = this;
   //  var xhttp;
   //  xhttp=new XMLHttpRequest();
   //  xhttp.onreadystatechange = function() {
       //if (this.readyState == 4 && this.status == 200) {
   //      thisShuffle.shuffle(deck); 
       //}
   //  };
     //block and wait
   //  xhttp.open("GET", 'http://localhost:3000/', false);
   //  xhttp.send();   
   }




   //get hands by dealing alternating cards from deck
   getHands(deck, handCount, dealerHand, playerHand){

      var nIndex = 0;
      for(var i=0; i<handCount; i++){
          playerHand.push(deck[nIndex]);
          dealerHand.push(deck[nIndex+1]);
          nIndex = nIndex + 2;
       }
   }
}

export class RPPoker  {

   constructor(game, playerCount) {
    this.game = game;
    this.playerCount = playerCount;
  }


  get deck(){



  }

}

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





 
