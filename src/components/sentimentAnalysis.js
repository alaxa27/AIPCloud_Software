import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Collapse} from 'reactstrap';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import {fetchTextSentiment} from '../actions/textSentimentActions';
import {fetchKeywordExtraction} from '../actions/keywordExtractionActions';

import SentimentAnalysisResults from './sentimentAnalysisResults'
import KeywordExtractionResults from './keywordExtractionResults'

const mapStateToProps = function(state) {
  return {
    fetched: (state.keywordExtraction.fetched && state.textSentiment.fetched),
    fetching: (state.keywordExtraction.fetching || state.textSentiment.fetching)
  }
}

const textAreaInput = "Ce sont mille chemins différents qui nous ont conduits ici aujourd’hui, vous et moi, animés par le même désir de servir. Et même si ce désir n’a pas le même visage, pas la même forme, même s’il n’emporte pas les mêmes conséquences, nous en connaissons vous et moi la source : le simple amour de la patrie. Certains font de la politique depuis longtemps ; pour d’autres, au nombre desquels je me range, c’est loin d’être le cas. Vous soutiendrez ou vous combattrez, selon vos convictions, le gouvernement que j’ai nommé. Mais à la fin nous savons tous que quelque chose de très profond nous réunit, nous anime et nous engage. Oui, le simple amour de la patrie - que celle-ci s’incarne dans la solitude des collines de Haute Provence ou des Ardennes, dans la tristesse des grands ensembles où une partie de notre jeunesse s’abîme, dans la campagne parfois dure à vivre et à travailler, dans les déserts industriels, mais aussi dans la gaieté surprenante des commencements. De cet amour nous tirons tous, je crois, la même impatience, qui est une impatience d’agir. Elle prend parfois les traits de l’optimisme volontaire, d’autres fois ceux d’une colère sincère. Toujours elle découle de cette même origine."

class SentimentAnalysis extends Component {
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
    this.setState({
      textAreaInput: e.target.value,
      words: e.target.value.split(' ').length - 1,
      characters: e.target.value.replace(/ /g, "").length
    })
  }

  fetchAnalyze() {
    this.props.dispatch(fetchTextSentiment(this.state.textAreaInput))
    this.props.dispatch(fetchKeywordExtraction(this.state.textAreaInput))
  }

  render() {
    return (
      <div classname="row">
        <div className="col-md-12">
          <BlockUi tag="div" blocking={this.props.fetching}>
            <div className="card">
              <h4 className="card-header card-title">
                Tester notre service
              </h4>
              <div className="card-block">
                <div className="form-group">
                  <div className="row">
                    <div className=" col-md-12">
                      <textarea id="textarea-input" name="textarea-input" rows="9" className="form-control" placeholder="" value={this.state.textAreaInput} onChange={this.ontextAreaInputChange.bind(this)}></textarea>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <button type="submit" className="btn btn-sm btn-primary" onClick={this.fetchAnalyze.bind(this)}>Analyser !</button>
                  </div>
                  <div className="col"></div>
                  <div className="col"></div>
                  <div className="col">
                    <div className="text-muted">{this.state.words} mots, {this.state.characters} caractères</div>
                  </div>
                </div>

                <br/>

                <hr className="mt-0"/>

                <br/>

                <Collapse isOpen={this.props.fetched || this.props.fetching}>
                  <SentimentAnalysisResults />
                  <hr className="mt-0"/>
                  <KeywordExtractionResults />
                </Collapse>
              </div>
            </div>
          </BlockUi>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(SentimentAnalysis);
