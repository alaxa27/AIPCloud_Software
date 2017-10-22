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

import EntriesTable from './entriesTable';

import * as actions from '../actions/entries';

class Entries extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.fetchEntries();
  }

  render() {
    return (
      <div className="app">
        <div className="app-body">
          <main className="main">
            <div className="animated fadeIn container-fluid">
              <Card className="card-block">
                <CardTitle>Entries</CardTitle>
                <Row>
                  <Col>
                    <EntriesTable entries={this.props.entries}/>
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
  return {entries: state.cs.entries.entries}
}

export default connect(mapStateToProps, actions)(Entries);
