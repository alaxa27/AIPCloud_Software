
const analysis= {
  request: '0',
  threat: '0',
  opinion: '0',
}
export default function reducer(state={
  fetching: false,
  fetched: false,
  error: null,
  analysis: analysis
}, action) {
  switch(action.type){
    case "FETCH_INTENT_ANALYSIS": {
      return {...state, fetching: true, fetched: false, analysis: analysis}
    }
    case "FETCH_INTENT_ANALYSIS_FULFILLED": {
      action.payload.request = (action.payload.request * 100).toFixed(2);
      action.payload.threat = (action.payload.threat * 100).toFixed(2);
      action.payload.opinion = (action.payload.opinion * 100).toFixed(2);
      return {...state, fetching: false, fetched: true, analysis: action.payload}
    }
    case "FETCH_INTENT_ANALYSIS_REJECTED": {
      return {...state,
      fetching: false,
      fetched: false,
      error: action.payload}
    }
    case "RESET_INTENT_ANALYSIS": {
      return {...state,
      fetching: false,
      fetched: false,
      analysis: analysis}
    }
    default: {
      return {...state}
    }
  }

}
