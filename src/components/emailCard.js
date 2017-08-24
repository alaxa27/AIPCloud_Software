import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Collapse, Row, Col, Button} from 'reactstrap';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import { fetchTextSentiment } from '../actions/textSentimentActions';
import { fetchKeywordExtraction } from '../actions/keywordExtractionActions';
import { fetchCustomerAnalysis } from '../actions/customerAnalysisActions';

import SentimentAnalysisResults from './sentimentAnalysisResults';
import KeywordExtractionResults from './keywordExtractionResults';
import CustomerAnalysisResults from './customerAnalysisResults';

const mapStateToProps = function(state) {
  return {
    sentimentFetched: state.textSentiment.fetched,
    sentimentFetching: state.textSentiment.fetching,
    keywordsFetched: state.keywordExtraction.fetched,
    keywordsFetching: state.keywordExtraction.fetching,
    customerFetched: state.customerAnalysis.fetched,
    customerFetching: state.customerAnalysis.fetching
  }
}



class EmailCard extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      textAreaInput: props.text,
      words: props.text.split(' ').length ,
      characters: props.text.replace(/ /g, "").length
    };
  }

  componentWillMount() {
    if (this.props.sentimentFetched) {
      this.resetAnalyzes()
    }
    this.props.dispatch(fetchTextSentiment(this.state.textAreaInput))
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({activeTab: tab});
    }
  }

  ontextAreaInputChange(e) {
    this.resetAnalyzes()
    this.setState({
      textAreaInput: e.target.value,
      words: e.target.value.split(' ').length - 1,
      characters: e.target.value.replace(/ /g, "").length
    })
  }

  resetAnalyzes() {
    this.props.dispatch({
      type:"RESET_TEXT_SENTIMENT"
    })
    this.props.dispatch({
      type:"RESET_KEYWORD_EXTRACTION"
    })
    this.props.dispatch({
      type:"RESET_CUSTOMER_ANALYSIS"
    })
  }


  fetchKeywords() {
    this.props.dispatch(fetchKeywordExtraction(this.state.textAreaInput))
  }

  fetchCustomer() {
    this.props.dispatch(fetchCustomerAnalysis(this.state.textAreaInput))
  }

  render() {
    return (
      <div classname="row">
        <div className="col-md-12">
          <BlockUi tag="div" blocking={this.props.sentimentFetching || this.props.keywordsFetching || this.props.customerFetching}>
            <div className="card">
              <div className="card-block">
                <div className="col">
                  <div className="text-muted">{this.state.words} mots, {this.state.characters} caractères</div>
                </div>

                <hr className="mt-0"/>

                <Collapse isOpen={this.props.sentimentFetching || this.props.sentimentFetched}>
                  <SentimentAnalysisResults />
                  <Row>
                    <Col sm={{ size: 1, push: 0, pull: 0, offset: 0}}>
                      {this.props.sentimentFetched && !(this.props.keywordsFetched || this.props.keywordsFetching) ?
                        <Button outline type="submit" size="md" className="btn-opener fa-chevron-down" onClick={this.fetchKeywords.bind(this)}>
                        </Button>
                        : null
                      }
                    </Col>
                  </Row>

                </Collapse>
                <Collapse isOpen={(this.props.keywordsFetched || this.props.keywordsFetching) && this.props.sentimentFetched}>
                  <br />
                  <hr className="mt-0"/>
                  <KeywordExtractionResults />
                  <Row>
                    <Col sm={{ size: 1, push: 0, pull: 0, offset: 0}}>
                      {this.props.keywordsFetched && !(this.props.customerFetched || this.props.customerFetching) ?
                        <Button outline type="submit" size="md" className="btn-opener fa-chevron-down" onClick={this.fetchCustomer.bind(this)}>
                        </Button>
                        : null
                      }
                    </Col>
                  </Row>
                </Collapse>
                <Collapse isOpen={(this.props.customerFetched || this.props.customerFetching) && this.props.sentimentFetched && this.props.keywordsFetched}>
                  <br />
                  <hr className="mt-0"/>
                  <CustomerAnalysisResults />
                </Collapse>
              </div>
            </div>
          </BlockUi>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(EmailCard);
