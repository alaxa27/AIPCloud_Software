import React, {
  Component,
  PropTypes,
} from 'react';

/**
 * Import styles
 */
import 'normalize.css';
import './WordCloud.css';

/**
 * Import Elements
 */
import Cloud from './Cloud';
import Sidebar from './Sidebar';

/**
 * Compose individual components
 */
export default class WordCloud extends Component {

  /**
   * Set initial state of component
   * @param  {Object} props Props of component
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      selectedTopic: null,
    };
    this.onSelectTopic = this.onSelectTopic.bind(this);
  }

  /**
   * Click handler
   * @param  {String} topic Whole topic object
   * @return {void}
   */
  onSelectTopic(topic) {
    this.props.updateSelectedTopic(topic)
    this.setState({
      selectedTopic: topic,
    });
  }

  /**
   * Compose components
   * @return {ReactElement} [description]
   */
  render() {
    const {
      fontName,
      fontSizes,
      height,
      topics,
      width,
      updateSelectedTopic
    } = this.props;

    if (topics.length === 0) {
      return (<span></span>);
    }
    //Add this under section to get a title
    // <h1 className="wordcloud__title">WordCloud</h1>
    //Add this to get a sidebar
    // <Sidebar
    //   topic={this.state.selectedTopic}
    // />

    return (
      <section className="wordcloud">
        <Cloud
          fontName={fontName}
          fontSizes={fontSizes}
          height={height}
          onSelectTopic={this.onSelectTopic}
          selectedTopic={this.state.selectedTopic}
          topics={topics}
          width={width}
        />
      </section>
    );
  }
}

// WordCloud.propTypes = {
//   fontName: PropTypes.string,
//   fontSizes: PropTypes.array,
//   height: PropTypes.number,
//   topics: PropTypes.array,
//   width: PropTypes.number,
// };

WordCloud.defaultProps = {
  fontName: 'Sans-Serif',
  fontSizes: [13, 16, 20, 26, 35, 49],
  height: 400,
  topics: [],
  width: 400,
};
