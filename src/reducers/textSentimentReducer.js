export default function reducer(state={
  fetching: false,
  fetched: false,
  error: null,
  text_sentiment: {
    positivity: '0',
    neutrality: '0',
    negativity: '0',
    relevance: '0',
    summary: ''
  }
}, action) {
  switch(action.type){
    case "FETCH_TEXT_SENTIMENT": {
      return {...state, fetching: true, fetched: false}
    }
    case "FETCH_TEXT_SENTIMENT_FULFILLED": {
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
