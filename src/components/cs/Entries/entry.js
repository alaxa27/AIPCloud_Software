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

import * as actions from '../actions/entries';

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.fetchEntry(this.props.match.params.id);
  }

  renderTranscription() {
    return this.props.entry.analysis.sound.speech_2_text.map((line, key) => {
      const sent = line.sentiment;
      console.log(sent);
      return (
        <tr key={key}>
          <td>{line.transcript}</td>
          <td>
            (this.props.done ?
            <Progress multi>
              <Progress bar color="success" value={(sent.positivity * 100).toFixed(2)}/>
              <Progress bar color="muted" value={(sent.neutrality * 100).toFixed(2)}/>
              <Progress bar color="danger" value={(sent.negativity * 100).toFixed(2)}/>
            </Progress> : null)
          </td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div className="app">
        <div className="app-header"></div>
        <div className="app-body">
          <main className="main">
            <div className="animated fadeIn container-fluid">
              <Card>
                <CardTitle>
                  {this.props.entry.customer.first_name + ' ' + this.props.entry.customer.last_name}
                </CardTitle>
              </Card>
              <Row>
                <Col>
              <Card>
                <CardHeader tag="h3">Transcription</CardHeader>
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
              </Col>
            </Row>
            </div>
          </main>
        </div >
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {entry: state.cs.entries.entry,
  done: state.cs.entries.done}
}
export default connect(mapStateToProps, actions)(Entry);
