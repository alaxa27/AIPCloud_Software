import React, { Component } from 'react';
import {connect} from 'react-redux';

import { Progress } from 'reactstrap'

import PopoverItem from './popoverItem'

const mapStateToProps = function(state) {
  return {
    textSentiment: state.textSentiment.text_sentiment
  }
}

class SentimentAnalysisResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popovers: [
        {
          placement: 'right',
          icon: 'icon-question',
          title: 'Positivité',
          content: 'Mesure indiquant la probabilité que le texte soit positif.'
        }, {
          placement: 'right',
          icon: 'icon-question',
          title: 'Neutralité',
          content: 'Mesure indiquant la probabilité que le texte soit neutre.'
        }, {
          placement: 'right',
          icon: 'icon-question',
          title: 'Négativité',
          content: 'Mesure indiquant la probabilité que le texte soit négatif.'
        }, {
          placement: 'top',
          icon: 'icon-question',
          title: 'Pertinence',
          content: 'La pertinence mesure si l\'analyse est cohérente et fournit des résultats justes.'
        }
      ]
    }
  }

  render() {
    return(
          <div className="row">
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-12">
                  <Progress multi>
                    <Progress bar color="success" value={this.props.textSentiment.positivity}/>
                    <Progress bar color="muted" value={this.props.textSentiment.neutrality}/>
                    <Progress bar color="danger" value={this.props.textSentiment.negativity}/>
                  </Progress>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="callout callout-success">
                    <div className="row">
                      <div className="col">
                        <small className="text-muted">Positivité</small><br/>
                      </div>
                      <div className="col">
                        <PopoverItem key={0} item={this.state.popovers[0]} id={0}/>
                      </div>
                    </div>
                    <strong className="h4">{this.props.textSentiment.positivity}
                      %</strong>
                    <div className="chart-wrapper">
                      <canvas id="sparkline-chart-1" width="100" height="30"></canvas>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="callout callout-muted">
                    <div className="row">
                      <div className="col">
                        <small className="text-muted">Neutralité</small><br/>
                      </div>
                      <div className="col">
                        <PopoverItem key={1} item={this.state.popovers[1]} id={1}/>
                      </div>
                    </div>
                    <strong className="h4">{this.props.textSentiment.neutrality}
                      %</strong>
                    <div className="chart-wrapper">
                      <canvas id="sparkline-chart-1" width="100" height="30"></canvas>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="callout callout-danger">
                    <div className="row">
                      <div className="col">
                        <small className="text-muted">Négativité</small><br/>
                      </div>
                      <div className="col">
                        <PopoverItem key={2} item={this.state.popovers[2]} id={2}/>
                      </div>
                    </div>
                    <strong className="h4">{this.props.textSentiment.negativity}
                      %</strong>
                    <div className="chart-wrapper">
                      <canvas id="sparkline-chart-1" width="100" height="30"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              {this.props.textSentiment.relevance == "NaN"? null :
                <div className="callout callout-success">
                  <div className="row">
                    <div className="col">
                      <small className="text-muted">Pertinence</small><br/>
                    </div>
                    <div className="col">
                      <PopoverItem key={3} item={this.state.popovers[3]} id={3}/>
                    </div>
                  </div>
                  <strong className="h1">{this.props.textSentiment.relevance}
                    %</strong>
                  <div className="chart-wrapper">
                    <canvas id="sparkline-chart-1" width="100" height="30"></canvas>
                  </div>
                </div>
              }
              <div className="col">
                {this.props.textSentiment.summary}
              </div>
            </div>
          </div>

    );
  }
}

export default connect(mapStateToProps)(SentimentAnalysisResults)
