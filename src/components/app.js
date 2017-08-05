import React, { Component } from 'react';

import SentimentAnalysis from './sentimentAnalysis'

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  render() {
    return (
      <div>
        <SentimentAnalysis />
      </div>
    );
  }
}

export default App;
