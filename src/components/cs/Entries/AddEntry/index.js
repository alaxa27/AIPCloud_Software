import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Row,
  Col,
  Progress,
  Card,
  CardBlock,
  CardHeader,
  CardFooter,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'reactstrap';
import fs from 'fs'
import FormData from 'form-data'
import path from 'path'

import ConversationForm from './conversation'

import * as actions from '../../actions/entries';

class AddEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    //
    this.sendValue = this.sendValue.bind(this)
    //
    this.onSubmit = this.onSubmit.bind(this)
    //
    this.handleCustomerFirstName = this.handleCustomerFirstName.bind(this)
    this.handleCustomerLastName = this.handleCustomerLastName.bind(this)
    this.onSelectChange = this.onSelectChange.bind(this)
  }

  componentWillMount() {}

  sendValue(state) {
    this.setState(state)
  }

  onSelectChange(e) {
    this.TypeForm = ((type) => {
      switch (type) {
        case 'conversation':
          return (<ConversationForm sendValue={this.sendValue}/>)
        default:
          return (
            <h1>Not ready yet.</h1>
          )
      }
    })(e.target.value)
    this.forceUpdate()
    this.setState({type: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.createEntry(this.state)
  }

  handleCustomerFirstName(e) {
    this.setState({customerFirstName: e.target.value})
  }

  handleCustomerLastName(e) {
    this.setState({customerLastName: e.target.value})
  }

  render() {
    return (
      <Form>
        <ModalHeader>
          Add an entry
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label tag="h4">Customer Information</Label>
          </FormGroup>
          <FormGroup>
            <Label for="customerFirstName" sm={2}>FirstName(s)</Label>
            <Input name="customerFirstName" id="customerFirstName" onChange={this.handleCustomerFirstName}/>
            <Label for="customerLastName" sm={2}>LastName</Label>
            <Input name="customerLastName" id="customerLastName" onChange={this.handleCustomerLastName}/>
          </FormGroup>
          <FormGroup>
            <Label for="typeSelect" sm={2} tag="h4">Type</Label>
            <Input type="select" name="select" id="typeSelect" onChange={this.onSelectChange}>
              <option>
                -- select a type --
              </option>
              <option>
                conversation
              </option>
              <option>
                image
              </option>
              <option>
                comment
              </option>
            </Input>
          </FormGroup>
          {this.TypeForm}
          {(this.props.progress === -1
            ? null
            : <Progress color={(this.props.progress < 100
              ? null
              : 'success')} value={this.props.progress}/>)}
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={this.onSubmit}>Push!</Button>
        </ModalFooter>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {progress: state.cs.upload.progress}
}

export default connect(mapStateToProps, actions)(AddEntry);
