import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalFooter,
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
import {Radar} from 'react-chartjs-2'
import BlockUi from 'react-block-ui';

import Header from '../Header'
import AudioPlayer from './audioPlayer'
import WaveForm from './waveform'
import Spinner from '../Spinner'

import * as entriesActions from '../actions/entries';
import * as modalActions from '../actions/modal'


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
      this.props.entriesActions.analyzeEntry(this.props.entry.id)
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
    const radar = {
      options: {
        scale: {
          ticks: {
            min: 0,
            max: 1
          }
        }
      },
      data: {
        labels: [
          'Angry',
          'Calm',
          'Disgust',
          'Fearful',
          'Happy',
          'Neutral',
          'Sad',
          'Surprise'
        ],
        datasets: [
          {
            label: 'Emotion',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
            data: [
              this.props.emotion.results[0].angry,
              this.props.emotion.results[0].calm,
              this.props.emotion.results[0].disgust,
              this.props.emotion.results[0].fearful,
              this.props.emotion.results[0].happy,
              this.props.emotion.results[0].neutral,
              this.props.emotion.results[0].sad,
              this.props.emotion.results[0].surprise
            ]
          }
        ]
      }
    };

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
                    {(!this.props.entry.loading ? <WaveForm src={fileURL}></WaveForm> : null)}
                  </CardBody>
                </Card>
                <Row>
                  <Col>
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
                  </Col>
                  <Col>
                    <Card>
                      <CardHeader tag="h5">Emotion through time</CardHeader>
                      <CardBody>
                        <div className="chart-wrapper">
                          {(!this.props.entry.loading
                            ? <Radar {...radar}/>
                            : 'Loading...')}
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Modal isOpen={this.props.deleteModal} toggle={this.toggleDeleteModal} className={this.props.className}>
                  <ModalHeader>
                    Delete entry
                  </ModalHeader>
                  <ModalFooter>
                    <Button color="danger" onClick={this.deleteEntry}>Delete</Button>{' '}
                    <Button color="secondary" onClick={this.toggleDeleteModal}>Cancel</Button>
                  </ModalFooter>
                </Modal>
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
