import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  Button,
  ButtonGroup,
  Table,
  Modal,
  Alert
} from 'reactstrap';
import BlockUi from 'react-block-ui';
import { Menu, MainButton, ChildButton } from 'react-mfb';

import 'react-mfb/mfb.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Stats from './stats';
import EntriesTable from './entriesTable';
import AddEntry from './AddEntry';

import * as entriesActions from '../../actions/cs/entries';
import * as modalActions from '../../actions/cs/modal';


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
      <div className="animated fadeIn">
        <BlockUi tag="div" blocking={this.props.loading}>
          {(this.props.deletingEntry ?
          <Alert color="success">
            Entry successfully deleted!
          </Alert>
          : null)}
          <Stats values={values}/>
          <MuiThemeProvider>
            <EntriesTable entries={this.props.entries}/>
          </MuiThemeProvider>
          <Modal isOpen={this.props.addModal} toggle={this.toggle} className={this.props.className}>
            <AddEntry/>
          </Modal>
        </BlockUi>
        <Menu effect="zoomin" method="hover" position="br">
          <MainButton iconResting="icons icon-arrow-up" iconActive="icons icon-arrow-down" />
          <ChildButton
            icon="icons icon-energy"
            label="Analyze selected entries"
            className="btn-primary"/>
          <ChildButton
            icon="icons icon-plus"
            label="Add an entry"
            className="btn-primary"
            onClick={this.toggle}/>
        </Menu>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {entries: state.cs.entries.entries, addModal: state.cs.modal.add_modal, loading: state.cs.entries.loading, deletingEntry: state.cs.entries.deleting_entry};
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
