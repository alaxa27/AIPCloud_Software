import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Modal, ModalHeader, ModalFooter, Button} from 'reactstrap';

class DeleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal isOpen={this.props.deleteModal} toggle={this.props.toggleDeleteModal} className={this.props.className}>
        <ModalHeader>
          Delete entry
        </ModalHeader>
        <ModalFooter>
          <Button color="secondary" onClick={this.props.toggleDeleteModal}>Cancel</Button>
          <Button color="danger" onClick={this.props.deleteEntry}>Delete</Button>{' '}
        </ModalFooter>
      </Modal>
    );
  }
}

export default (DeleteModal);
