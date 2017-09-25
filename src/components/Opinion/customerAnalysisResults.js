import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Progress } from 'reactstrap';


const mapStateToProps = function(state) {
  return {
    analysis: state.customerAnalysis.analysis,
    fetched: state.customerAnalysis.fetched
  }
}


class CustomerAnalysisResults extends Component {

  render() {
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
