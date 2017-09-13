import {Doughnut} from 'react-chartjs-2';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Radar, Chart } from 'react-chartjs-2';
import { Progress } from 'reactstrap';


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
      labels: ['satisfaction', 'Aggressivité', 'Remboursement'],
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
      <ul className="horizontal-bars type-2">
        <li>
          <i className="icon-user"></i>
          <span className="title">Satisfaction</span>
          <span className="value">{this.props.analysis.satisfaction}%</span>
          <div className="bars">
            <Progress className="progress-sm" color="info" value={this.props.analysis.satisfaction}/>
          </div>
        </li>
        <li>
          <i className="fa fa-bomb"></i>
          <span className="title">Agressivité</span>
          <span className="value">{this.props.analysis.agressivity}%</span>
          <div className="bars">
            <Progress className="progress-sm" color="info" value={this.props.analysis.agressivity}/>
          </div>
        </li>
        <li>
          <i className="fa fa-money"></i>
          <span className="title">Remboursement</span>
          <span className="value">{this.props.analysis.refund}%</span>
          <div className="bars">
            <Progress className="progress-sm" color="info" value={this.props.analysis.refund}/>
          </div>
        </li>
      </ul>
    );
  }
}

export default connect(mapStateToProps)(CustomerAnalysisResults)
