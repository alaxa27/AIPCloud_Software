import React, { Component } from 'react';
import { Popover, PopoverTitle, PopoverContent } from 'reactstrap'

class PopoverItem extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    return (
      <span>
        <i className="icon-question" size="sm" color="secondary" id={'Popover-' + this.props.id} onClick={this.toggle}>
        </i>
        <Popover placement={this.props.item.placement} isOpen={this.state.popoverOpen} target={'Popover-' + this.props.id} toggle={this.toggle}>
          <PopoverTitle>{this.props.item.title}</PopoverTitle>
          <PopoverContent>{this.props.item.content}</PopoverContent>
        </Popover>
      </span>
    );
  }
}

export default PopoverItem
