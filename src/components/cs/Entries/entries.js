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

import Header from './header';
import Stats from './stats';
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
    const values = this.props.entries.map((e, key) => {
      return e.timestamp.getTime();
    })
    return (
      <div className="app header-fixed">
        <Header/>
        <div className="app-body">
          <main className="main">
            <div className="container-fluid">
              <div className="animated fadeIn">
                <div>

                </div>
                <Stats values={values}/>
                <EntriesTable entries={this.props.entries}/>
              </div>
            </div>
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
