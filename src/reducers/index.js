import { combineReducers } from 'redux';

import textSentiment from './textSentimentReducer';
import keywordExtraction from './keywordExtractionReducer';

export default combineReducers({
	keywordExtraction,
	textSentiment
})
