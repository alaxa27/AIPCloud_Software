import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardTitle,
  Button,
  ButtonGroup,
  Table,
  Progress
} from 'reactstrap';
import BlockUi from 'react-block-ui';

import Header from '../Header'
import WaveForm from './waveform'
import DeleteModal from './deleteModal'
import Spinner from '../Spinner'

import * as entriesActions from '../actions/entries';
import * as modalActions from '../actions/modal';


class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
  }

  componentWillMount() {
    this.props.actions.entriesActions.fetchEntry(this.props.match.params.id);
  }

  toggleDeleteModal() {
    this.props.actions.modalActions.toggleDeleteModal();
  }

  analyzeEntry() {
    if (!(this.props.entry.analyzing || this.props.entry.checked)) {
      this.props.actions.entriesActions.analyzeEntry(this.props.entry.id)
    }
  }

  deleteEntry() {
    this.props.actions.entriesActions.deleteEntry(this.props.entry.id)
    this.props.history.push('/cs/entries');
  }

  renderTranscription() {
    try {
      return this.props.speech_2_text.results.map((line, key) => {
        const sent = line.sentiment;
        return (
          <tr key={key}>
            <td>{line.transcript}</td>
            <td>
              {"___________________________________________"}
              <Progress multi>
                <Progress bar color="success" value={(sent.positivity * 100).toFixed(2)}/>
                <Progress bar color="muted" value={(sent.neutrality * 100).toFixed(2)}/>
                <Progress bar color="danger" value={(sent.negativity * 100).toFixed(2)}/>
              </Progress>
            </td>
          </tr>
        )
      })
    } catch (e) {
      return [ <p> No analysis results yet. </p>]
    }
  }

  render() {
    const fileURL = "https://firebasestorage.googleapis.com/v0/b/aipsoft-ce792.appspot.com/o/entries%2Fconversations%2F" + this.props.entry.file + "?alt=media&token=3d3b93c7-0b73-4758-b1f3-169f88c5eebd"

    return (
    <div className="app header-fixed">
      <Header></Header >
        <div className="app-body">
        <main className="main">
          <div className="container-fluid">
            <div className="animated fadeIn">
              <BlockUi tag="div" blocking={this.props.entry.loading}>
                <Card>
                  <CardHeader>
                    <Row>
                      <Col>
                        <CardTitle>
                          Conversation
                        </CardTitle>
                      </Col>
                      <Col>
                        <ButtonGroup className="float-right">
                          <Button color="danger" size="lg" onClick={this.toggleDeleteModal}>
                            <i className="icon-trash icons"></i>
                          </Button>
                          <Button color="primary" size="lg" onClick={this.analyzeEntry.bind(this)} disabled={this.props.entry.checked}>
                            {(this.props.entry.checked
                              ? <i className="icon-check icons"></i>
                              : (this.props.analyzing || this.props.entry.analyzing
                                ? <Spinner className="spinner-left" isLoading="true"/>
                                : <i className="icon-energy icons"></i>))}
                          </Button>
                      </ButtonGroup>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col>
                        {this.props.entry.customer.first_name + ' ' + this.props.entry.customer.last_name}
                      </Col>
                      <Col>
                        {this.props.entry.sales.first_name + ' ' + this.props.entry.sales.last_name}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                {(!this.props.entry.loading ? <WaveForm src={fileURL}></WaveForm> : null)}
                    <Card>
                      <CardHeader tag="h5">Transcription</CardHeader>
                      <CardBody>
                        <Table hover bordered>
                          <tbody>
                            {this.renderTranscription()}
                          </tbody>
                        </Table>
                      </CardBody>
                    </Card>
                <DeleteModal deleteModal={this.props.deleteModal} toggleDeleteModal={this.toggleDeleteModal} deleteEntry={this.deleteEntry}/>
              </BlockUi>
            </div>
          </div>
        </main>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    entry: state.cs.entries.entry,
    analyzing: state.cs.analysis.analyzing,
    emotion: state.cs.analysis.emotion,
    speech_2_text: state.cs.analysis.speech_2_text,
    deleteModal: state.cs.modal.delete_modal
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      entriesActions: bindActionCreators(entriesActions, dispatch),
      modalActions: bindActionCreators(modalActions, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
