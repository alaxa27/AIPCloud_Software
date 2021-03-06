import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Progress } from 'reactstrap';


const mapStateToProps = function(state) {
  return {
    analysis: state.intentAnalysis.analysis,
    fetched: state.intentAnalysis.fetched
  }
}


class IntentAnalysisResults extends Component {

  render() {
    return (
      <ul className="horizontal-bars type-2">
        <li>
          <span className="title">Requête</span>
          <span className="value">{this.props.analysis.request}%</span>
          <div className="bars">
            <Progress className="progress-sm" color="warning" value={this.props.analysis.request}/>
          </div>
        </li>
        <li>
          <span className="title">Plainte / Menace</span>
          <span className="value">{this.props.analysis.threat}%</span>
          <div className="bars">
            <Progress className="progress-sm" color="warning" value={this.props.analysis.threat}/>
          </div>
        </li>
        <li>
          <span className="title">Opinion</span>
          <span className="value">{this.props.analysis.opinion}%</span>
          <div className="bars">
            <Progress className="progress-sm" color="warning" value={this.props.analysis.opinion}/>
          </div>
        </li>
      </ul>
    );
  }
}
export default connect(mapStateToProps)(IntentAnalysisResults)
