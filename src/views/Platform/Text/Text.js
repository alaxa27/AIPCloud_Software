import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Collapse, Row, Col, Button} from 'reactstrap';
import BlockUi from 'react-block-ui';
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';



import { fetchTextSentiment } from '../../../actions/textSentimentActions';
import { fetchKeywordExtraction } from '../../../actions/keywordExtractionActions';

import SentimentAnalysisResults from './sentimentAnalysisResults';
import KeywordExtractionResults from './keywordExtractionResults';

const mapStateToProps = function(state) {
  return {
    sentimentFetched: state.textSentiment.fetched,
    sentimentFetching: state.textSentiment.fetching,
    keywordsFetched: state.keywordExtraction.fetched,
    keywordsFetching: state.keywordExtraction.fetching
  }
}

const textAreaInput = "Ce sont mille chemins différents qui nous ont conduits ici aujourd’hui, vous et moi, animés par le même désir de servir. Et même si ce désir n’a pas le même visage, pas la même forme, même s’il n’emporte pas les mêmes conséquences, nous en connaissons vous et moi la source : le simple amour de la patrie. Certains font de la politique depuis longtemps ; pour d’autres, au nombre desquels je me range, c’est loin d’être le cas. Vous soutiendrez ou vous combattrez, selon vos convictions, le gouvernement que j’ai nommé. Mais à la fin nous savons tous que quelque chose de très profond nous réunit, nous anime et nous engage. Oui, le simple amour de la patrie - que celle-ci s’incarne dans la solitude des collines de Haute Provence ou des Ardennes, dans la tristesse des grands ensembles où une partie de notre jeunesse s’abîme, dans la campagne parfois dure à vivre et à travailler, dans les déserts industriels, mais aussi dans la gaieté surprenante des commencements. De cet amour nous tirons tous, je crois, la même impatience, qui est une impatience d’agir. Elle prend parfois les traits de l’optimisme volontaire, d’autres fois ceux d’une colère sincère. Toujours elle découle de cette même origine."

class Text extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      textAreaInput: textAreaInput,
      words: textAreaInput.split(' ').length ,
      characters: textAreaInput.replace(/ /g, "").length
    };
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
      characters: e.target.value.replace(/ /g, "").length,
      keywordsOpened: false,
      keywordsVolume: 0.01
    })
  }

  resetAnalyzes() {
    this.props.dispatch({
      type:"RESET_TEXT_SENTIMENT"
    })
    this.props.dispatch({
      type:"RESET_KEYWORD_EXTRACTION"
    })
  }

  fetchSentiment() {
    if (this.props.sentimentFetched) {
      this.resetAnalyzes()
    }
    this.props.dispatch(fetchTextSentiment(this.state.textAreaInput))
  }

  fetchKeywords() {
    this.props.dispatch(fetchKeywordExtraction(this.state.textAreaInput, this.state.keywordsVolume))
  }

  openKeywords() {
    this.setState({
      keywordsOpened: true
    })
  }

  render() {
    const style = { float: 'left', width: 120, height: 200, marginBottom: 20, marginLeft: 60};
    const marks = {
      0.01: <strong>0%</strong>,
      1: <strong>100%</strong>,
    };
    function changeKeywordsVolume(value) {
      this.setState({
        keywordsVolume: value
      })
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <div className="col-md-12">
            <BlockUi tag="div" blocking={this.props.sentimentFetching || this.props.keywordsFetching}>
              <div className="card">
                <h4 className="card-header card-title">
                  Test text service
                </h4>
                <div className="card-block">
                  <div className="form-group">
                    <Row>
                      <div className=" col-md-12">
                        <textarea id="textarea-input" name="textarea-input" rows="9" className="form-control" placeholder="" value={this.state.textAreaInput} onChange={this.ontextAreaInputChange.bind(this)}></textarea>
                      </div>
                    </Row>
                  </div>
                  <Row>
                    <Col>
                      <button type="submit" className="btn btn-sm btn-primary" onClick={this.fetchSentiment.bind(this)}>Tester le service !</button>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                    <Col>
                      <div className="text-muted">{this.state.words} mots, {this.state.characters} caractères</div>
                    </Col>
                </Row>

                  <br/>


                  <hr className="mt-0"/>

                  <br />

                  <Collapse isOpen={this.props.sentimentFetching || this.props.sentimentFetched}>
                    <SentimentAnalysisResults />
                    <Row>
                      <Col sm={{ size: 1, push: 0, pull: 0, offset: 6}}>
                        {this.props.sentimentFetched && !(this.props.keywordsFetched || this.props.keywordsFetching) && !this.state.keywordsOpened ?
                          <Button outline type="submit" size="md" className="btn-opener fa-chevron-down" onClick={this.openKeywords.bind(this)}>
                          </Button>
                          : null
                        }
                      </Col>
                    </Row>
                  </Collapse>
                  <Collapse isOpen={this.state.keywordsOpened && this.props.sentimentFetched}>
                    <hr className="mt-0"/>
                    <br />
                    <Row>
                      <div className="border-right">
                        <Col md={{size: 1, push:1}}>
                          <Row>
                            <div style={style}>
                              <Slider vertical min={0.01} max={1} marks={marks} step={0.01} onChange={changeKeywordsVolume.bind(this)} defaultValue={0.2} />
                            </div>
                          </Row>
                          <Row>
                            <Button size="small" color="primary" onClick={this.fetchKeywords.bind(this)} className="align-button">
                              Extraction!
                            </Button>
                          </Row>
                        </Col>
                      </div>
                      <Col>
                        <Collapse isOpen={(this.props.keywordsFetched || this.props.keywordsFetching) && this.props.sentimentFetched}>
                          <KeywordExtractionResults />
                        </Collapse>
                      </Col>
                  </Row>
                </Collapse>
                </div>
              </div>
            </BlockUi>
          </div>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Text);
