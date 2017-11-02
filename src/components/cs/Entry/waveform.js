import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import WaveSurfer from 'wavesurfer.js';
import {Button, Row, Col} from 'reactstrap';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

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
    this.wavesurfer = WaveSurfer.create({container: this.$waveform, waveColor: '#db95a9', progressColor: 'purple'})
    this.wavesurfer.load(this.props.src)
    this.wavesurfer.on('ready', function() {
      this.setState({loading: false})
    }.bind(this));
  }
  componentWillUnmount() {}

  handleTogglePlay() {
    this.wavesurfer.playPause();
    this.setState({
      playing: this.wavesurfer.isPlaying()
    })
  }
  handlePosChange(e) {
    this.setState({pos: e.originalArgs[0]});
  }
  render() {
    console.log(this.wavesurfer);
    return (
      <BlockUi tag="div" blocking={this.state.loading}>
        <Row>
          <Col xs="3">
            <a href="#" onClick={this.handleTogglePlay} className={"play " + (this.state.playing ? "active" : null)}></a>
          </Col>
          <Col>
            <div className='waveform'>
              <div className='wave'></div>
            </div>
          </Col>
        </Row>
      </BlockUi>
    );
  }
}

export default WaveForm;
