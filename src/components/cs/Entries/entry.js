import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  Button,
  Table
} from 'reactstrap';

import * as actions from '../actions/entries';

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.fetchEntry(this.props.match.params.id);
  }

  render() {
    return (
      <div className="app">
        <div className="app-body">
          <main className="main">
            <div className="animated fadeIn container-fluid">
              <Card className="card-block">
                <CardTitle>Conversation</CardTitle>
                <Row>
                  <Col>
                    <h1>{this.props.entry.customer.first_name}</h1>
                  </Col>
                </Row>
              </Card>
            </div>
            {this.props.children}
          </main>
        </div>
        <div className="footer-fixed">
          <div className="app-footer">
            <Button color="primary" size="lg" className="float-right">Analyser!</Button>
          </div>
        </div>
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
  return {entry: state.cs.entries.entry}
}

export default connect(mapStateToProps, actions)(Entry);
