import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MersenneTwister from 'mersenne-twister';

// <script type="text/javascript" src="%PUBLIC_URL%/js/mersenne-twister.js">
  //  </script>


export class Random extends React.Component {
  constructor(props) {
    super(props);

    //var MersenneTwister = require('mersenne-twister');
     var generator = new MersenneTwister();
     var val = generator.random();
   
      this.state = {seed: val};

  }

  render() {
    return (
      <div id="react-random" className="">
        Seed: {this.state.seed}
      </div>
    );
  }
}

ReactDOM.render(<Random />, document.getElementById('arandom'));