import {Doughnut} from 'react-chartjs-2';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Radar, Chart } from 'react-chartjs-2';


const mapStateToProps = function(state) {
  return {
    analysis: state.customerAnalysis.analysis,
    fetched: state.customerAnalysis.fetched
  }
}


class CustomerAnalysisResults extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const radar = {
      labels: ['Sentiment', 'Aggressivité', 'Remboursement'],
      datasets: [
        {
          data: [this.props.analysis.sentiment, this.props.analysis.agressivity, this.props.analysis.refund]
        }
      ]
    };

    const options = {
      responsive: true,
      barStrokeWidth: 1,
      scale:{
        ticks:{
          min:0,
          max:100
        }
      }
    };

    return (
      <div className="row">
        <div className="col">
          <Radar  data={radar} options={options} height="50" redraw />
        </div>
      </div>

    );
  }
}

export default connect(mapStateToProps)(CustomerAnalysisResults)
