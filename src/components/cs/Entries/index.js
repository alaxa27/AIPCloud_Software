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
  ButtonGroup,
  Table,
  Modal,
  Alert
} from 'reactstrap';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import { Menu, MainButton, ChildButton } from 'react-mfb';
import 'react-mfb/mfb.css';

import Header from '../Header';
import Stats from './stats';
import EntriesTable from './entriesTable';
import AddEntry from './AddEntry';

import * as entriesActions from '../actions/entries';
import * as modalActions from '../actions/modal';

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
        // demo defaults
    const effect = 'zoomin',
        pos = 'br',
        method = 'hover';
    return (
      <div className="app header-fixed">
        <Header/>
        <div className="app-body">
          <main className="main">
            <div className="container-fluid">
              <div className="animated fadeIn">
                <BlockUi tag="div" blocking={this.props.loading}>
                  {(this.props.deletingEntry ?
                  <Alert color="success">
                    Entry successfully deleted!
                  </Alert>
                  : null)}
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
        <Menu effect="zoomin" method="hover" position="br">
          <MainButton iconResting="icons icon-arrow-up" iconActive="icons icon-arrow-down" />
          <ChildButton
            icon="icons icon-energy"
            label="Analyze selected entries"
            className="btn-primary"
            href="#" />
          <ChildButton
            icon="icons icon-plus"
            label="Add an entry"
            href="#"
            className="btn-primary"
            onClick={this.toggle} />
        </Menu>
      </div>
    );
  }
}

// <div className="footer-fixed">
//   <div className="app-footer">
//     <Row>
//       <Col>
//         <ButtonGroup className="float-right">
//           <Button color="dark" size="lg" onClick={this.toggle}>
//             <i className="icon-plus icons"></i>
//           </Button>
//           <Button color="primary" size="lg">
//             <i className="icon-energy icons"></i>
//           </Button>
//         </ButtonGroup>
//       </Col>
//     </Row>
//   </div>
// </div>
// const mapStateToProps = (state) => {
//   return {
//     entries: state.entries
//   }
// }

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
