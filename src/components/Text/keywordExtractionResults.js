import React, {Component} from 'react';
import {connect} from 'react-redux';

import {WordCloud, Sidebar} from './wordcloud';

const mapStateToProps = function(state) {
  return {
    extract: state.keywordExtraction.extract,
    fetched: state.keywordExtraction.fetched
  }
}

class KeywordExtractionResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTopic: null
    }
    this.updateSelectedTopic = this.updateSelectedTopic.bind(this)
  }

  updateSelectedTopic(topic){
    this.setState({
      selectedTopic: topic,
    });
  }

  render() {
    var props = {
      topics: this.props.extract, // Immutable.List
      title: 'Word Cloud',
      width: 800, // Overall widget dims
      height: 300,
      fontName: 'Open Sans',
      fontSizes: [12, 16, 20, 24, 30, 40], // font categories
      random: false, // If false, places topmost topic to the center, otherwise - random position within chart area bounds
      initialHighlight: true, // If true, activates topmost topic and loads its data to the table, otherwise table is empty
      updateSelectedTopic: this.updateSelectedTopic
    };
    // <div className="col">
    //   {this.props.fetched ?
    //     <Sidebar
    //       topic={this.state.selectedTopic}
    //       />
    //     : null }
    //   </div>
    return (
      <div className="row">
        <div className="col">
            <WordCloud
              {...props}
            />
        </div>
      </div>

    );
  }
}

export default connect(mapStateToProps)(KeywordExtractionResults)
