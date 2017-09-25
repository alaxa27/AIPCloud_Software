import React, {Component} from 'react';
import 'react-block-ui/style.css';

class TestCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <a href="#/text">Texte</a>
        <br />
        <a href="#/opinion">Opinion</a>
      </div>
    );
  }
}

export default (TestCard);
