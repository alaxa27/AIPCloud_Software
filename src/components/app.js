import React, { Component } from 'react';

import TestCard from './testCard'

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
        <TestCard />
      </div>
    );
  }
}

export default App;
