  import React, { Component } from 'react';
  import ReactDOM from 'react-dom';
  //used for seeding random number
  import MersenneTwister from 'mersenne-twister';

  //class to handle the deck
  export class RPEvaluator extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {hand: ["9.0","5.0","10.0","2.0","4.0"] };

      //full house - can kind of test 3 of a kind and full house and 1 pair
      this.state = {hand: ["1.0","14.0","27.0","2.0","15.0"] };

      //2 pair
      this.state = {hand: ["1.0","14.0","38.0","51.0","15.0"] };

      //straight flush 
      this.state = {hand: ["1.0","5.0","3.0","2.0","4.0"] };

      //royal flush
      this.state = {hand: ["1.0","11.0","12.0","13.0","10.0"] };
      

      //3 of a kind
     // this.state = {hand: ["1.0","14.0","27.0","4.0","15.0"] };

    }

    //render, todo: look at making this a 'pure' component
    //so that we can ignore lifecycle events but still keep
    //the benefits of being a react component
    render() {
      return (<div></div>);
    }

    //sort hand desc
    sortHandDesc(hand){

      hand.sort(function(a, b) {
        return b.value - a.value;
      });

    }

    //sort hand asc
    sortHandAsc(hand){

      hand.sort(function(a, b) {
        return a.value - b.value;
      });

    }

    //1=dealer wins, 2=player wins, 3=tie
    compareHands(dealerRank, playerRank){

      if(dealerRank.rank > playerRank.rank){
        return 1;
      }

      if(playerRank.rank > dealerRank.rank){
        return 2;
      }
      
      if(playerRank.rank == dealerRank.rank){
        
        if(dealerRank.highCardValue > playerRank.highCardValue){
          return 1;
        }
        if(playerRank.highCardValue > dealerRank.highCardValue){
          return 2;
        }

        //if tie move to second high card value
        if(playerRank.highCardValue == dealerRank.highCardValue){
          
           if(dealerRank.secondHighCardValue > playerRank.secondHighCardValue){
            return 1;
           }
           if(playerRank.secondHighCardValue > dealerRank.secondHighCardValue){
              return 2;
           }
        }

        //todo: 3 4 5 checks for tie
        
      }

      //its a tie...
      return 3;
    }

    //ranks a hand
    getRank(hand){

      //todo use hand passed in not hand in state
      let h = hand;//this.state.hand;
      
      //get details for the hand such as value, suite etc...
      let hd = this.getHandDetails(h);

      //sort the hand desc for compares
      this.sortHandDesc(hd);
      
      //adjust the value of A to 1 if needed
      //1=low, 14=high/face card
      this.adjustAceValue(hd);

      //get the high card in the hand
      let highCard = this.getHighCard(hd);
      //alert("High Card: " + highCard.fullName);
      var highCardValue = highCard.value;

      //get the second high card in the hand
      let secondHighCard = this.getSecondHighCard(hd);
      var secondHighCardValue = secondHighCard.value;
      //alert("Second High Card: " + secondHighCard.fullName);

      //flush
      let bFlush = this.isFlush(hd);
      //alert("Flush: " + bFlush);

      //straight
      let bStraight = this.isStraight(hd);
      //alert("Straight: " + bStraight);

      //straight flush
      let bStraightFlush = false;
      if(bStraight && bFlush){
        bStraightFlush = true;
      }
      //alert("StraightFlush: " + bStraightFlush);

      //todo
      let bRoyalFlush = this.getRoyalFlush(bStraight, bFlush, highCard, secondHighCard);
      //alert("Royal Flush: " + bRoyalFlush);

      //get card counts ie. 2 aces, 1 queen, 2 jacks
      let valueCounts = this.getValueCounts(hd);

      //todo
      let bFourofAKind = this.isFourofKind(valueCounts);
      //alert("For of a kind: " + bFourofAKind);

      //full house
      let bFullHouse = this.isFullHouse(valueCounts);
      //alert("Full House: " + bFullHouse);

      //3 of a kind
      let b3ofKind = this.is3ofKind(valueCounts);
      //alert("3 of a kind: " + b3ofKind);

      //2 pair
      let bTwoPair = this.isTwoPair(valueCounts);
      //alert("2 Pair: " + bTwoPair);

      //1 pair
      let bOnePair = this.isOnePair(valueCounts);
      //alert("1 Pair: " + bOnePair);
   
      /*
      ***at this point we should have all we need to rank the hand***
      10 bRoyalFlush       
       9 bStraightFlush
       8 bFourofAKind
       7 bFullHouse
       6 bFlush
       5 bStraight
       4 b3ofKind
       3 bTwoPair
       2 bOnePair
       1 highCard - note: used for tie breaker also
     ****/

      let rank = 0;
      let rankName = "unknown";
      let cnts = "";

      for(var t=0; t<valueCounts.length; t++)
      {
        cnts += valueCounts[t].cardName + "(" + valueCounts[t].count + ")";
        cnts += " ";
      }


      if(bRoyalFlush){
        rank = 10;
        rankName = "Royal Flush";
      }else{
        if(bStraightFlush){
          rank = 9;
          rankName = highCard.name + " high ";
          rankName += "Straight Flush";

        }else{
          if(bFourofAKind){
            rank = 8;
            rankName = "Four  ";
            for(var t=0; t<valueCounts.length; t++) {
                         if(valueCounts[t].count == 4){
                            rankName += valueCounts[t].cardName + "s ";
                          }
                        }

          }else{
            if(bFullHouse){
              rank = 7;
              rankName = "Full House ";
              for(var t=0; t<valueCounts.length; t++) {
                         if(valueCounts[t].count == 3){
                            rankName += valueCounts[t].cardName + "s ";
                          }
                        }
              for(var t=0; t<valueCounts.length; t++) {
                         if(valueCounts[t].count == 2){
                            rankName += valueCounts[t].cardName + "s ";
                          }
                        }

            }else{
              if(bFlush){
                rank = 6;
                 rankName = highCard.name + " high ";
                 rankName += "Flush";
              }else{
                if(bStraight){
                  rank = 5;  
                  rankName = highCard.name + " high ";
                  rankName += "Straight";

                }else{
                  if(b3ofKind){
                    rank = 4;
                    rankName = "Three ";

                    for(var t=0; t<valueCounts.length; t++) {
                         if(valueCounts[t].count == 3){
                            rankName += valueCounts[t].cardName + "s ";

                            //adjust highcard value for ties
                            highCardValue = valueCounts[t].value;
                          }
                        }


                  }else{
                    if(bTwoPair){
                      rank = 3;
                      rankName = "Two Pair ";
                      let bLargePair = true;
                      for(var t=0; t<valueCounts.length; t++) {
                         if(valueCounts[t].count == 2){
                            rankName += valueCounts[t].cardName + "s ";
                            if(bLargePair){
                              //adjust highcard value for tie
                              highCardValue = valueCounts[t].value;
                              bLargePair = false;
                            }
                            else{
                              secondHighCardValue = valueCounts[t].value;
                            }
                          }
                        }

                    }else{
                      if(bOnePair){
                         rank = 2; 
                         rankName = "Pair of ";

                         for(var t=0; t<valueCounts.length; t++) {
                            if(valueCounts[t].count == 2){
                              rankName += valueCounts[t].cardName + "s";
                              //adjust highcard value for tie
                              highCardValue = valueCounts[t].value;
                            }
                          }
                      }else{
                        rank = 1;
                        rankName = "";
                        rankName += highCard.name + " High";
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

     // alert("rank: " + rank);

      //this.alertHand(hd);
      //this.alertValueCounts(valueCounts);
     // alert("highcard: " + highCard.value);

   
      return {rank: rank, rankName: rankName, highCardValue: highCardValue, secondHighCardValue: secondHighCardValue, counts: cnts, hand: hand};

    }

    isFourofKind(valueCounts){
      
      let bHas4 = false;
    
      for(var i=0; i<valueCounts.length; i++){
        let c = valueCounts[i];
        if(c.count == 4){
          bHas4 = true;
        }
      }

      if(bHas4){
        return true;
      }

      return false;
    }

   getRoyalFlush(bStraight, bFlush, highCard, secondHighCard){
     
      //its a straight
      if(!bStraight){
        return false;
      }
      //its a flush
      if(!bFlush){
        return false;
      }
      //A
      if(highCard.value != 14){
        return false;
      }
      //K
      if(secondHighCard.value != 13){
        return false;
      }
      //dot really have to go any further...

      return true;
    }

    //is straight? note:hand passed in is sorted desc by value
    isStraight(hand){
      //first card
      let compareCard = hand[0];

      //1 to n not 0 to n
      for(var i=1; i<hand.length; i++){
        
        let currCard = hand[i];
        let chkVal = compareCard.value - 1;
        if(currCard.value != chkVal){
          return false;
        }
        compareCard = hand[i];
      }
      return true;
    }

    //is full house
    isFullHouse(valueCounts){

      let bHas3 = false;
      let bHas2 = false;

      for(var i=0; i<valueCounts.length; i++){
        let c = valueCounts[i];
        if(c.count == 3){
          bHas3 = true;
        }
        if(c.count == 2){
          bHas2 = true;
        }
      }

      if(bHas3 && bHas2){
        return true;
      }

      return false;
    }

    //is 3 of a kind
    is3ofKind(valueCounts){

      let bHas3 = false;
    
      for(var i=0; i<valueCounts.length; i++){
        let c = valueCounts[i];
        if(c.count == 3){
          bHas3 = true;
        }
      }

      if(bHas3){
        return true;
      }

      return false;
    }

    //2 pair
    isTwoPair(valueCounts){

      let bHas2a = false;
      let bHas2b = false;

      for(var i=0; i<valueCounts.length; i++){
        let c = valueCounts[i];
        if(c.count == 2){
          if(!bHas2a){
            bHas2a = true;
          }
          else{
            bHas2b = true;
          }
        }
      }

      if(bHas2a && bHas2b){
        return true;
      }

      return false;
    }

    //1 pair
    isOnePair(valueCounts){

      let bHasPair = false;
      
      for(var i=0; i<valueCounts.length; i++){
        let c = valueCounts[i];
        if(c.count == 2){
          bHasPair = true;
        }
      }

      if(bHasPair){
        return true;
      }

      return false;
    }

    //gets the high card in the hand, if pair it gets the 1st card of the pair
    //used to determine winner if no pairs etc...
    getHighCard(hand){
      let idx = 0;
      let lastVal = 0;
      for(var i=0; i<hand.length; i++){
        let c = hand[i];
        if(c.value > lastVal){
          lastVal = c.value;
          idx = i;
        }
      }

      return hand[idx];
    }

    //second high card
    getSecondHighCard(hand){
      
      let cHigh = this.getHighCard(hand);
      let hand2 = [];
      for(var i=0; i<hand.length; i++){
        if(hand[i].value != cHigh.value){
          hand2.push(hand[i]);
        }
      }

      return this.getHighCard(hand2);
    }


    //gets array of card values with dounts
    //ie. 2 aces, 1 queen, 2 jacks
    getValueCounts(hand){
      let valueCounts = [];
      for(var i=0; i<hand.length; i++){
        
        let c = hand[i];
        
        let count = 0;
        for(var j=0; j<hand.length; j++){
          if(hand[j].value == c.value){
            count++;
          }
        }

        let inList = false
        for(var k=0; k<valueCounts.length; k++){
          if(valueCounts[k].value == c.value){
            inList = true;
          }
        }

        if(!inList){
          valueCounts.push({value: c.value, count: count, cardName: c.name })
        }
      }

      return valueCounts;
    }

    //alerts a hand for debugging
    alertValueCounts(valueCounts){

      let s = '';
      for(var i=0; i<valueCounts.length; i++)
      {
        s += valueCounts[i].value + "(" + valueCounts[i].count + ")--";

      }

      alert(s);
    }

    //alerts a hand for debugging
    alertHand(hand){

      let s = '';
      for(var i=0; i<hand.length; i++)
      {
        s += hand[i].name + "(" + hand[i].value + ")" + "(" +  hand[i].count  + ")--";

      }

      alert(s);
    }

    //is the hand a flush
    isFlush(hand){
      if(!hand){
        return false;
      }
      if(hand[0].length < 1){
        return false;
      }

      let s1 = hand[0].suite;
      for(var i=1; i<hand.length; i++){
        if(hand[i].suite != s1){
          return false;
        }
      }

      return true;
    }

    //set A to 1 if needed
    adjustAceValue(hand){

      if(!hand){
        return;
      }
      if(hand[0].length < 1){
        return;
      }

      let h = hand;
      let chk = '';
      for(var i=0; i<h.length; i++){
        chk += h[i].value + '|';
      }

      //if this is A 5 4 3 2 then low straight 
      //so flip value of A and resort
      if(chk === "14|5|4|3|2|"){
        hand[0].value = 1;
        this.sortHandDesc(hand);
      }

      //alert(hand[0].value + "--" + hand[1].value + "--" + hand[2].value + "--" + hand[3].value + "--" + hand[4].value);
     
    }
      
    get CardCounts() {


    }

    get Rankings(){

      let ranks = [];



      return ranks;
    }

    getHandDetails(hand){
      let h = hand.sort();
      let details = [];
      let detailsDeck = this.getDetailsDeck();
      for(var i=0; i<detailsDeck.length; i++){
        //todo: this is slow
        for(var j=0; j<h.length; j++){
          if(detailsDeck[i].key === h[j]){
            details.push(detailsDeck[i]);
          }
        }

      }
      return details;
    }

    getDetailsDeck(){

     let eDeck = [ {key:"1.0", value: 14, suite: "1", suiteName: "Spades", 
                  name: "Ace", count: 1, fullName: "Ace of Spades"},

                   {key:"2.0", value: 2, suite: "1",  suiteName: "Spades",
                  name: "Duece", count: 1, fullName: "Duece of Spades"},

                   {key:"3.0", value: 3, suite: "1",  suiteName: "Spades",
                  name: "3", count: 1, fullName: "3 of Spades"},

                   {key:"4.0", value: 4, suite: "1",  suiteName: "Spades",
                  name: "4", count: 1, fullName: "4 of Spades"},

                   {key:"5.0", value: 5, suite: "1",  suiteName: "Spades",
                  name: "5", count: 1, fullName: "5 of Spades"},

                   {key:"6.0", value: 6, suite: "1",  suiteName: "Spades",
                  name: "6", count: 1, fullName: "6 of Spades"},

                   {key:"7.0", value: 7, suite: "1",  suiteName: "Spades",
                  name: "7", count: 1, fullName: "7 of Spades"},

                   {key:"8.0", value: 8, suite: "1",  suiteName: "Spades",
                  name: "8", count: 1, fullName: "8 of Spades"},

                   {key:"9.0", value: 9, suite: "1",  suiteName: "Spades",
                  name: "9", count: 1, fullName: "9 of Spades"},

                   {key:"10.0", value: 10, suite: "1",  suiteName: "Spades",
                  name: "10", count: 1, fullName: "10 of Spades"},

                   {key:"11.0", value: 11, suite: "1",  suiteName: "Spades",
                  name: "Jack", count: 1, fullName: "Jack of Spades"},

                   {key:"12.0", value: 12, suite: "1",  suiteName: "Spades",
                  name: "Queen", count: 1, fullName: "Queen of Spades"},

                   {key:"13.0", value: 13, suite: "1",  suiteName: "Spades",
                  name: "King", count: 1, fullName: "King of Spades"},

                  {key:"14.0", value: 14, suite: "2", suiteName: "Hearts", 
                  name: "Ace", count: 1, fullName: "Ace of Hearts"},

                   {key:"15.0", value: 2, suite: "2",  suiteName: "Hearts",
                  name: "Duece", count: 1, fullName: "Duece of Hearts"},

                   {key:"16.0", value: 3, suite: "2",  suiteName: "Hearts",
                  name: "3", count: 1, fullName: "3 of Hearts"},

                   {key:"17.0", value: 4, suite: "2",  suiteName: "Hearts",
                  name: "4", count: 1, fullName: "4 of Hearts"},

                   {key:"18.0", value: 5, suite: "2",  suiteName: "Hearts",
                  name: "5", count: 1, fullName: "5 of Hearts"},

                   {key:"19.0", value: 6, suite: "2",  suiteName: "Hearts",
                  name: "6", count: 1, fullName: "6 of Hearts"},

                   {key:"20.0", value: 7, suite: "2",  suiteName: "Hearts",
                  name: "7", count: 1, fullName: "7 of Hearts"},

                   {key:"21.0", value: 8, suite: "2",  suiteName: "Hearts",
                  name: "8", count: 1, fullName: "8 of Hearts"},

                   {key:"22.0", value: 9, suite: "2",  suiteName: "Hearts",
                  name: "9", count: 1, fullName: "9 of Hearts"},

                   {key:"23.0", value: 10, suite: "2",  suiteName: "Hearts",
                  name: "10", count: 1, fullName: "10 of Hearts"},

                   {key:"24.0", value: 11, suite: "2",  suiteName: "Hearts",
                  name: "Jack", count: 1, fullName: "Jack of Hearts"},

                   {key:"25.0", value: 12, suite: "2",  suiteName: "Hearts",
                  name: "Queen", count: 1, fullName: "Queen of Hearts"},

                   {key:"26.0", value: 13, suite: "2",  suiteName: "Hearts",
                  name: "King", count: 1, fullName: "King of Hearts"},

                  {key:"27.0", value: 14, suite: "3", suiteName: "Clubs", 
                  name: "Ace", count: 1, fullName: "Ace of Clubs"},

                   {key:"28.0", value: 2, suite: "3",  suiteName: "Clubs",
                  name: "Duece", count: 1, fullName: "Duece of Clubs"},

                   {key:"29.0", value: 3, suite: "3",  suiteName: "Clubs",
                  name: "3", count: 1, fullName: "3 of Clubs"},

                   {key:"30.0", value: 4, suite: "3",  suiteName: "Clubs",
                  name: "4", count: 1, fullName: "4 of Clubs"},

                   {key:"31.0", value: 5, suite: "3",  suiteName: "Clubs",
                  name: "5", count: 1, fullName: "5 of Clubs"},

                   {key:"32.0", value: 6, suite: "3",  suiteName: "Clubs",
                  name: "6", count: 1, fullName: "6 of Clubs"},

                   {key:"33.0", value: 7, suite: "3",  suiteName: "Clubs",
                  name: "7", count: 1, fullName: "7 of Clubs"},

                   {key:"34.0", value: 8, suite: "3",  suiteName: "Clubs",
                  name: "8", count: 1, fullName: "8 of Clubs"},

                   {key:"35.0", value: 9, suite: "3",  suiteName: "Clubs",
                  name: "9", count: 1, fullName: "9 of Clubs"},

                   {key:"36.0", value: 10, suite: "3",  suiteName: "Clubs",
                  name: "10", count: 1, fullName: "10 of Clubs"},

                   {key:"37.0", value: 11, suite: "3",  suiteName: "Clubs",
                  name: "Jack", count: 1, fullName: "Jack of Clubs"},

                   {key:"38.0", value: 12, suite: "3",  suiteName: "Clubs",
                  name: "Queen", count: 1, fullName: "Queen of Clubs"},

                   {key:"39.0", value: 13, suite: "3",  suiteName: "Clubs",
                  name: "King", count: 1, fullName: "King of Clubs"},

                  {key:"40.0", value: 14, suite: "4", suiteName: "Diamonds", 
                  name: "Ace", count: 1, fullName: "Ace of Diamonds"},

                   {key:"41.0", value: 2, suite: "4",  suiteName: "Diamonds",
                  name: "Duece", count: 1, fullName: "Duece of Diamonds"},

                   {key:"42.0", value: 3, suite: "4",  suiteName: "Diamonds",
                  name: "3", count: 1, fullName: "3 of Diamonds"},

                   {key:"43.0", value: 4, suite: "4",  suiteName: "Diamonds",
                  name: "4", count: 1, fullName: "4 of Diamonds"},

                   {key:"44.0", value: 5, suite: "4",  suiteName: "Diamonds",
                  name: "5", count: 1, fullName: "5 of Diamonds"},

                   {key:"45.0", value: 6, suite: "4",  suiteName: "Diamonds",
                  name: "6", count: 1, fullName: "6 of Diamonds"},

                   {key:"46.0", value: 7, suite: "4",  suiteName: "Diamonds",
                  name: "7", count: 1, fullName: "7 of Diamonds"},

                   {key:"47.0", value: 8, suite: "4",  suiteName: "Diamonds",
                  name: "8", count: 1, fullName: "8 of Diamonds"},

                   {key:"48.0", value: 9, suite: "4",  suiteName: "Diamonds",
                  name: "9", count: 1, fullName: "9 of Diamonds"},

                   {key:"49.0", value: 10, suite: "4",  suiteName: "Diamonds",
                  name: "10", count: 1, fullName: "10 of Diamonds"},

                   {key:"50.0", value: 11, suite: "4",  suiteName: "Diamonds",
                  name: "Jack", count: 1, fullName: "Jack of Diamonds"},

                   {key:"51.0", value: 12, suite: "4",  suiteName: "Diamonds",
                  name: "Queen", count: 1, fullName: "Queen of Diamonds"},

                   {key:"52.0", value: 13, suite: "4",  suiteName: "Diamonds",
                  name: "King", count: 1, fullName: "King of Diamonds"},

                 ];

     return eDeck;

    }

  }



   
