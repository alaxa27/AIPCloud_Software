import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import WaveSurfer from 'wavesurfer.js';
import {Button, Row, Col, Card, CardHeader, CardBody, CardTitle} from 'reactstrap';
import BlockUi from 'react-block-ui';

import EmotionChart from './emotionChart';

class WaveForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      pos: 0,
      loading: true
    };
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handlePosChange = this.handlePosChange.bind(this);
  }

  componentWillMount() {}

  componentDidMount() {
    this.$el = ReactDOM.findDOMNode(this)
    this.$waveform = this.$el.querySelector('.wave')
    this.wavesurfer = WaveSurfer.create({container: this.$waveform, cursorWidth: 2, waveColor: '#000000', barWidth: 2, progressColor: 'purple'})
    this.wavesurfer.load(this.props.src)
    this.wavesurfer.on('ready', function() {
      this.setState({loading: false})
    }.bind(this));
    this.wavesurfer.on('play', function() {
    }.bind(this));
  }
  componentWillUnmount() {}

  handleTogglePlay() {
    this.wavesurfer.playPause();
    this.setState({playing: this.wavesurfer.isPlaying()})
  }
  handlePosChange(e) {
    this.setState({pos: e.originalArgs[0]});
  }
  render() {
    return (
      <BlockUi tag="div" blocking={this.state.loading}>
        <Card>
          <CardHeader>
            <CardTitle className="float-left">
              Emotion
            </CardTitle>
            <div href="#" onClick={this.handleTogglePlay} className={"float-right play " + (this.state.playing
                ? "active"
                : null)}></div>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs="3">
                </Col>
                <Col>
                  <div className='waveform align-emotion-chart'>
                    <div className='wave'></div>
                  </div>
                  <div>
                    <EmotionChart />
                  </div>
                </Col>
              </Row>
          </CardBody>
        </Card>
      </BlockUi>
    );
  }
}

export default WaveForm;
