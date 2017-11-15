import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Line} from 'react-chartjs-2'


class EmotionChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      pos: 0
    };
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handlePosChange = this.handlePosChange.bind(this);
  }

  componentWillMount() {}

  handleTogglePlay() {
    this.setState({
      playing: !this.state.playing
    });
  }
  handlePosChange(e) {
    this.setState({pos: e.originalArgs[0]});
  }
  render() {
    let emotion = {
      angry: [],
      calm: [],
      disgust: [],
      fearful: [],
      neutral: [],
      happy: [],
      sad: [],
      surprise: []
    }
    const emotion_length = this.props.emotion.results.length;
    this.props.emotion.results.forEach(snap => {
      emotion.angry.push(snap.angry)
      emotion.calm.push(snap.calm)
      emotion.disgust.push(snap.disgust)
      emotion.fearful.push(snap.fearful)
      emotion.happy.push(snap.happy)
      emotion.neutral.push(snap.neutral)
      emotion.sad.push(snap.sad)
      emotion.surprise.push(snap.surprise)
    })
    const line = {
      width: 960,
      height: 256,
      data: {
        labels: new Array(emotion_length),
        datasets: [
          {
            label: 'Angry',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(184, 28, 28, 0.4)',
            borderColor: 'rgba(184, 28, 28,1)',
            pointBorderColor: 'rgba(184, 28, 28,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(184, 28, 28,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: emotion.angry
          }, {
            label: 'Disgust',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(158, 157, 36, 0.4)',
            borderColor: 'rgba(158, 157, 36, 1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(85, 139, 47, 1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(158, 157, 36, 1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: emotion.disgust
          }, {
            label: 'Sad',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(25, 118, 210, 0.4)',
            borderColor: 'rgba(25, 118, 210, 1)',
            pointBorderColor: 'rgba(25, 118, 210, 1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(25, 118, 210, 1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: emotion.sad
          }, {
            label: 'Fearful',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(66, 66, 66, 0.4)',
            borderColor: 'rgba(66, 66, 66,1)',
            pointBorderColor: 'rgba(66, 66, 66,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(66, 66, 66,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: emotion.fearful
          }, {
            label: 'Neutral',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(142, 36, 170, 0.4)',
            borderColor: 'rgba(142, 36, 170, 1)',
            pointBorderColor: 'rgba(142, 36, 170, 1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(142, 36, 170, 1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: emotion.neutral
          }, {
            label: 'Calm',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(21, 101, 193, 0.4)',
            borderColor: 'rgba(21, 101, 193, 1)',
            pointBorderColor: 'rgba(21, 101, 193, 1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(21, 101, 193, 1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: emotion.calm
          }, {
            label: 'Happy',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(0, 191, 165, 0.4)',
            borderColor: 'rgba(0, 191, 165, 1)',
            pointBorderColor: 'rgba(0, 191, 165, 1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(0, 191, 165, 1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: emotion.happy
          }, {
            label: 'Surprise',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(255, 143, 0, 0.4)',
            borderColor: 'rgba(255, 143, 0, 1)',
            pointBorderColor: 'rgba(255, 143, 0, 1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(255, 143, 0, 1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: emotion.surprise
          }
        ]
      }
    };

    return (
      <div>
        <Line {...line} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    emotion: state.cs.analysis.emotion,
  }
}

export default connect(mapStateToProps)(EmotionChart);
