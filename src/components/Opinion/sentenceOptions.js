import React, {Component} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import classnames from 'classnames'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';


class SentenceOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  options = [
        "Dapibus ac facilisis in",
        "Morbi leo risus",
        "Porta ac consectetur ac",
        "Vestibulum at ers"
  ]


  render() {
    const listOptions = this.options.map(function(option, i) {
      return (
        <ListGroupItem key={i} tag="button" onClick={() => {this.props.onClick(option)}} action>{option}</ListGroupItem>
      )
    }.bind(this))
    return (
      <ListGroup>
        <div className="options">
          {listOptions}
        </div>
      </ListGroup>
    );
  }
}

export default (SentenceOptions);
