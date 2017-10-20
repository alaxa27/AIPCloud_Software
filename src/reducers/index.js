import { combineReducers } from 'redux';

import textSentiment from './textSentimentReducer';
import keywordExtraction from './keywordExtractionReducer';
import customerAnalysis from './customerAnalysisReducer';
import intentAnalysis from './intentAnalysisReducer'
//Customer Service Reducers:
import cs from '../components/cs/reducers';


export default combineReducers({
	keywordExtraction,
	textSentiment,
	customerAnalysis,
	intentAnalysis,
	cs
})
