import { combineReducers } from 'redux';

import textSentiment from './textSentimentReducer';
import keywordExtraction from './keywordExtractionReducer';
import customerAnalysis from './customerAnalysisReducer';

export default combineReducers({
	keywordExtraction,
	textSentiment,
	customerAnalysis
})
