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
  FormText
} from 'reactstrap';
import ConversationForm from './conversation'

import * as actions from '../../actions/entries';

class AddEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    //
    this.sendValue = this.sendValue.bind(this)
    //
    this.onSubmit = this.onSubmit.bind(this)
    //
    this.handleCustomerFirstName = this.handleCustomerFirstName.bind(this)
    this.handleCustomerLastName = this.handleCustomerLastName.bind(this)
    this.onSelectChange = this.onSelectChange.bind(this)
  }

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
      <div className="app">
        <div className="app-header"></div>
        <div className="app-body">
          <main className="main">
            <div className="animated fadeIn container-fluid">
              <Card>
                <CardHeader tag="h3">Add an entry</CardHeader>
                <Form>
                  <CardBlock>
                    <FormGroup>
                      <Label plaintext tag="h4">Customer Information</Label>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="customerFirstName" sm={2}>FirstName(s)</Label>
                      <Col sm={10}>
                        <Input name="customerFirstName" id="customerFirstName" onChange={this.handleCustomerFirstName}/>
                      </Col>
                      <Label for="customerLastName" sm={2}>LastName</Label>
                      <Col sm={10}>
                        <Input name="customerLastName" id="customerLastName" onChange={this.handleCustomerLastName}/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="typeSelect" sm={2} tag="h4">Type</Label>
                      <Col sm={10}>
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
                      </Col>
                    </FormGroup>
                    {this.TypeForm}
                  </CardBlock>
                  <CardFooter>
                    <Row>
                      <Col>
                        <Button color="success" onClick={this.onSubmit}>Push!</Button>
                      </Col>
                      <Col>
                        {(this.props.progress === -1 ? null : <Progress color={(this.props.progress < 100 ? null : 'success')} value={this.props.progress}/>)}
                      </Col>
                    </Row>
                  </CardFooter>
                </Form>
              </Card>
            </div>
          </main>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    progress: state.cs.upload.progress
  }
}

export default connect(mapStateToProps, actions)(AddEntry);
