import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Collapse, Row, Col, Button, Input } from 'reactstrap';
import BlockUi from 'react-block-ui';

import { fetchTextSentiment } from '../../../actions/textSentimentActions';
import { fetchCustomerAnalysis } from '../../../actions/customerAnalysisActions';
import { fetchIntentAnalysis } from '../../../actions/intentAnalysisActions';

import SentenceOptions from './sentenceOptions';

import SentimentAnalysisResults from './sentimentAnalysisResults';
import CustomerAnalysisResults from './customerAnalysisResults';
import IntentAnalysisResults from './intentAnalysisResults';

const mapStateToProps = function(state) {
  return {
    sentimentFetched: state.textSentiment.fetched,
    sentimentFetching: state.textSentiment.fetching,
    customerFetched: state.customerAnalysis.fetched,
    customerFetching: state.customerAnalysis.fetching,
    intentFetched: state.intentAnalysis.fetched,
    intentFetching: state.intentAnalysis.fetching
  }
}

const textAreaInput = ""

class Opinion extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      textAreaInput: textAreaInput,
      words: (textAreaInput.length > 0 ? textAreaInput.split(' ').length : 0),
      characters: textAreaInput.replace(/ /g, "").length
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({activeTab: tab});
    }
  }


  ontextAreaInputChange(e) {
    this.changeText(e.target.value)
  }

  changeText(text) {
    this.resetAnalyzes()
    this.setState({
      textAreaInput: text,
      words: (text.length > 0 ? text.split(' ').length : 0),
      characters: text.replace(/ /g, "").length
    })
  }

  resetAnalyzes() {
    this.props.dispatch({
      type:"RESET_TEXT_SENTIMENT"
    })
    this.props.dispatch({
      type:"RESET_CUSTOMER_ANALYSIS"
    })
    this.props.dispatch({
      type:"RESET_INTENT_ANALYSIS"
    })
  }

  fetchSentiment() {
    if (this.props.sentimentFetched) {
      this.resetAnalyzes()
    }
    this.props.dispatch(fetchTextSentiment(this.state.textAreaInput))
  }

  fetchIntent() {
    this.props.dispatch(fetchIntentAnalysis(this.state.textAreaInput))
  }

  fetchCustomer() {
    this.props.dispatch(fetchCustomerAnalysis(this.state.textAreaInput))
    this.fetchIntent()
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <BlockUi tag="div" blocking={this.props.sentimentFetching || this.props.customerFetching}>
              <div className="card">
                <h4 className="card-header card-title">
                  Test opinion service
                </h4>
                <div className="card-block">
                  <div className="form-group">
                    <Row>
                      <Col className=" col-md-12">
                        <SentenceOptions onClick={this.changeText.bind(this)}/>
                        <br />
                        <Input id="textarea-input" name="textarea-input" rows="9" className="form-control" placeholder="" value={this.state.textAreaInput} onChange={this.ontextAreaInputChange.bind(this)}></Input>
                      </Col>
                    </Row>
                  </div>
                  <div className="row">
                    <div className="col">
                      <button type="submit" className="btn btn-sm btn-primary" onClick={this.fetchSentiment.bind(this)}>Tester le service !</button>
                    </div>
                    <div className="col"></div>
                    <div className="col"></div>
                    <div className="col">
                      <div className="text-muted">{this.state.words} mots, {this.state.characters} caractères</div>
                    </div>
                  </div>

                  <br/>


                  <hr className="mt-0"/>

                  <br />

                  <Collapse isOpen={this.props.sentimentFetching || this.props.sentimentFetched}>
                    <SentimentAnalysisResults />
                    <Row>
                      <Col sm={{ size: 1, push: 0, pull: 0, offset: 6}}>
                        {this.props.sentimentFetched && !(this.props.customerFetched || this.props.customerFetching) ?
                          <Button outline type="submit" size="md" className="btn-opener fa-chevron-down" onClick={this.fetchCustomer.bind(this)}>
                          </Button>
                          : null
                        }
                      </Col>
                    </Row>
                  </Collapse>
                  <Collapse isOpen={(this.props.customerFetched || this.props.customerFetching) && this.props.sentimentFetched}>
                    <br />
                    <hr className="mt-0"/>
                    <Row>
                      <Col>
                        <IntentAnalysisResults />
                      </Col>
                    </Row>
                  </Collapse>
                </div>
              </div>
            </BlockUi>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Opinion);
