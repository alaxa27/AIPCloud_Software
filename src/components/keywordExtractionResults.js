import React, {Component} from 'react';
import {connect} from 'react-redux';

import {WordCloud} from './wordcloud';

const mapStateToProps = function(state) {
  return {extract: state.keywordExtraction.extract}
}

class KeywordExtractionResults extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-9">
          <WordCloud
            topics={this.props.extract}
          />
        </div>
      </div>

    );
  }
}

export default connect(mapStateToProps)(KeywordExtractionResults)
