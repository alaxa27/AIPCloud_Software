
const text_sentiment= {
  positivity: '0',
  neutrality: '0',
  negativity: '0',
  relevance: '0',
  summary: ''
}
export default function reducer(state={
  fetching: false,
  fetched: false,
  error: null,
  text_sentiment: text_sentiment
}, action) {
  switch(action.type){
    case "FETCH_TEXT_SENTIMENT": {
      return {...state, fetching: true, fetched: false, text_sentiment: text_sentiment}
    }
    case "FETCH_TEXT_SENTIMENT_FULFILLED": {
      action.payload.positivity = (action.payload.positivity * 100).toFixed(2);
      action.payload.neutrality = (action.payload.neutrality * 100).toFixed(2);
      action.payload.negativity = (action.payload.negativity * 100).toFixed(2);
      action.payload.relevance = (action.payload.relevance * 100).toFixed(2);
      return {...state, fetching: false, fetched: true, text_sentiment: action.payload}
    }
    case "FETCH_TEXT_SENTIMENT_REJECTED": {
      return {...state,
      fetching: false,
      fetched: false,
      error: action.payload}
    }
    default: {
      return {...state}
    }
  }

}
