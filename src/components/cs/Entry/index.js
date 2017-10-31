import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Row,
  Col,
  Card,
  CardBlock,
  CardHeader,
  CardFooter,
  CardTitle,
  CardBody,
  Button,
  Table,
  Progress
} from 'reactstrap';
import {Radar} from 'react-chartjs-2'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import Header from '../Header'
import AudioPlayer from './audioPlayer'
import Spinner from '../Spinner'

import * as actions from '../actions/entries';

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.fetchEntry(this.props.match.params.id);
  }

  analyzeEntry() {
    if (!(this.props.entry.analyzing || this.props.entry.checked)){
      this.props.analyzeEntry(this.props.match.params.id)
    }
  }

  renderTranscription() {
    try {
      return this.props.entry.analysis.speech_2_text.results.map((line, key) => {
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

  emotionResults() {
    try {
      const r = this.props.entry.analysis.emotion.results[0];
      return r
    }catch(e) {
      return {};
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
              this.emotionResults().angry,
              this.emotionResults().calm,
              this.emotionResults().disgust,
              this.emotionResults().fearful,
              this.emotionResults().happy,
              this.emotionResults().neutral,
              this.emotionResults().sad,
              this.emotionResults().surprise
            ]
          }
        ]
      }
    };
    return (
    <div className="app header-fixed">
      <Header></Header>
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
                          <a>
                          <Button color="primary" size="lg" className="float-right" onClick={this.analyzeEntry.bind(this)} disabled={this.props.entry.checked}>
                            {(this.props.entry.checked ? <i className="icon-check icons"></i> :
                              ( this.props.analyzing || this.props.entry.analyzing ? <Spinner className="spinner-left" isLoading="true"/> : <i className="icon-energy icons"></i>))}
                          </Button>
                          </a>
                        </Col>
                      </Row>
                    </CardHeader>
                    <CardBlock>
                      <Row>
                        <Col>
                          {this.props.entry.customer.first_name + ' ' + this.props.entry.customer.last_name}
                        </Col>
                        <Col>
                          {this.props.entry.sales.first_name + ' ' + this.props.entry.sales.last_name}
                        </Col>
                      </Row>
                    </CardBlock>
                  </Card>
                  <Row>
                    <Col>
                      <Card>
                        <CardHeader tag="h5">Transcription</CardHeader>
                        <CardBlock>
                          <Table hover bordered>
                            <tbody>
                              {this.renderTranscription()}
                            </tbody>
                          </Table>
                        </CardBlock>
                      </Card>
                    </Col>
                    <Col>
                      <Card>
                        <CardHeader tag="h5">Emotion through time</CardHeader>
                        <CardBlock>
                          <div className="chart-wrapper">
                            {(!this.props.entry.loading
                              ? <Radar {...radar}/>
                              : 'Loading...')}
                          </div>
                        </CardBlock>
                      </Card>
                    </Col>
                  </Row>
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
  return {entry: state.cs.entries.entry, analyzing: state.cs.analysis.analyzing}
}
export default connect(mapStateToProps, actions)(Entry);
