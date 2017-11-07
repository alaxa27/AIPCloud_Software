import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  Button,
  Table,
  Modal
} from 'reactstrap';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import Header from '../Header';
import Stats from './stats';
import EntriesTable from './entriesTable';
import AddEntry from './AddEntry'

import * as entriesActions from '../actions/entries';
import * as modalActions from '../actions/modal'

class Entries extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    this.props.actions.entriesActions.fetchEntries();
  }

  toggle() {
    this.props.actions.modalActions.toggleAddModal();
  }

  render() {
    const values = this.props.entries.map((e, key) => {
      try {
        return e.timestamp.getTime();
      } catch (e) {
        return new Date().getTime();
      }
    })
    return (
      <div className="app header-fixed">
        <Header/>
        <div className="app-body">
          <main className="main">
            <div className="container-fluid">
              <div className="animated fadeIn">
                <BlockUi tag="div" blocking={this.props.loading}>
                  <Stats values={values}/>
                  <EntriesTable entries={this.props.entries}/>
                  <Modal isOpen={this.props.addModal} toggle={this.toggle} className={this.props.className}>
                    <AddEntry/>
                  </Modal>
                </BlockUi>
              </div>
            </div>
          </main>
        </div>
        <div className="footer-fixed">
          <div className="app-footer">
            <Row>
              <Col>
                <Button color="success" size="lg" className="float-left" onClick={this.toggle}>+</Button>
              </Col>
              <Col>
                <Button color="primary" size="lg" className="float-right">Analyser!</Button>
              </Col>
            </Row>
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
  return {entries: state.cs.entries.entries, addModal: state.cs.modal.add_modal, loading: state.cs.entries.loading};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      entriesActions: bindActionCreators(entriesActions, dispatch),
      modalActions: bindActionCreators(modalActions, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Entries);
