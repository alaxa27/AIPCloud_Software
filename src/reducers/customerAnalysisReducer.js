
const analysis= {
  sentiment: '0',
  agressivity: '0',
  refund: '0',
}
export default function reducer(state={
  fetching: false,
  fetched: false,
  error: null,
  analysis: analysis
}, action) {
  switch(action.type){
    case "FETCH_CUSTOMER_ANALYSIS": {
      return {...state, fetching: true, fetched: false, analysis: analysis}
    }
    case "FETCH_CUSTOMER_ANALYSIS_FULFILLED": {
      action.payload.sentiment = (action.payload.sentiment * 100).toFixed(2);
      action.payload.agressivity = (action.payload.agressivity * 100).toFixed(2);
      action.payload.refund = (action.payload.refund * 100).toFixed(2);
      return {...state, fetching: false, fetched: true, analysis: action.payload}
    }
    case "FETCH_CUSTOMER_ANALYSIS_REJECTED": {
      return {...state,
      fetching: false,
      fetched: false,
      error: action.payload}
    }
    case "RESET_CUSTOMER_ANALYSIS": {
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
