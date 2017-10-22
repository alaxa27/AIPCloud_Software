import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';

import * as actions from '../../actions/entries';

class ConversationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    //
    this.handleSalesFirstName = this.handleSalesFirstName.bind(this)
    this.handleSalesLastName = this.handleSalesLastName.bind(this)
    this.handleFile = this.handleFile.bind(this)
  }

  handleSalesFirstName(e) {
    this.setState({salesFirstName: e.target.value}, () => {
      this.props.sendValue(this.state)
    })
  }

  handleSalesLastName(e) {
    this.setState({salesLastName: e.target.value}, () => {
      this.props.sendValue(this.state)
    })
  }

  handleFile(e) {
    this.setState({file: e.target.files[0]}, () => {
      this.props.sendValue(this.state)
    })
  }

  render() {
    return (
      <div>
        <FormGroup>
          <Label plaintext tag="h4">Sales Information</Label>
        </FormGroup>
        <FormGroup row>
          <Label for="salesFirstName" sm={2}>FirstName(s)</Label>
          <Col sm={10}>
            <Input name="salesFirstName" id="salesFirstName" onChange={this.handleSalesFirstName}/>
          </Col>
          <Label for="salesLastName" sm={2}>LastName</Label>
          <Col sm={10}>
            <Input name="salesLastName" id="salesLastName" onChange={this.handleSalesLastName}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="conversationFile" sm={2}>File</Label>
          <Col sm={10}>
            <Input type="file" name="file" id="conversationFile" onChange={this.handleFile}/>
            <FormText color="muted">
              Please make sure the file is in .wav format
            </FormText>
          </Col>
        </FormGroup>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     entries: state.entries
//   }
// }

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, actions)(ConversationForm);
