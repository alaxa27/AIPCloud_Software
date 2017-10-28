import React, {Component} from 'react';
import {Row, Col, Card, CardTitle, CardBlock} from 'reactstrap';
import {Line} from 'react-chartjs-2';

const brandPrimary = '#20a8d8';
const brandSuccess = '#4dbd74';
const brandInfo = '#63c2de';
const brandDanger = '#f86c6b';

// convert Hex to RGBA
function convertHex(hex, opacity) {
  hex = hex.replace('#', '');
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);

  var result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
  return result;
}

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  render() {
    let values = this.props.values
    let max = Math.max.apply(null, values);
    let min = Math.min.apply(null, values);
    let range = max - min
    values = values.map((v, key) => {
      return (v - min) / (max - min)
    })
    const N = 10
    let classes = Array.apply(null, Array(N)).map(Number.prototype.valueOf, 0);
    values.forEach(v => {
      classes[(v => {
          for (var i = 0; i <= N; i++) {
            if (v < i / N) {
              return i - 1;
            }
          }
        })(v)] += 1;
    })
    // console.log(values);
    // console.log(classes[10]);
    console.log(classes);

    let mainChartProps = {
      data: {
        datasets: [
          {
            label: 'My Second dataset',
            backgroundColor: convertHex(brandPrimary, 10),
            borderColor: brandPrimary,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: classes
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'category',
            labels: Array.from(Array(N).keys())
          }],
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      },
      height: 300
    }

    // <Line data={mainChart} options={mainChartOpts} height={300}/>
    return (
      <div>
        <Card>
          <CardBlock>
            <Row>
              <Col>
                <CardTitle>Stats</CardTitle>
              </Col>
            </Row>
            <div className="chart-wrapper" style={{
              height: 300 + 'px',
              marginTop: 40 + 'px'
            }}>
              <Line {...mainChartProps}/>
            </div>
          </CardBlock>
        </Card>
      </div>
    );
  }
}

export default Stats;
