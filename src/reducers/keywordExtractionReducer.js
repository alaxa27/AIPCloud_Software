import 'axios'

// export function resetCustomerAnalysis() {
//   return function(dispatch) {
//     dispatch({
//       type: "RESET_CUSTOMER_ANALYSIS"
//     })
//   }
// }

export default function reducer(state={
  fetching: false,
  fetched: false,
  error: null,
  extract: []
}, action) {
  switch(action.type){
    case "FETCH_KEYWORD_EXTRACTION": {
      return {...state, fetching: true, fetched: false, extract:[]}
    }
    case "FETCH_KEYWORD_EXTRACTION_FULFILLED": {
      let extract = action.payload.map((e, key) => {
        return({
          "id": "lkjlkjlkj",
          "volume": Math.round(e.score * 10000),
          "label": e.keyword,
          "sentiment" : (e.sentiment ?
            {
              "positive": parseFloat((e.sentiment.positivity * 100).toFixed(2)),
              "neutral": parseFloat((e.sentiment.neutrality * 100).toFixed(2)),
              "negative": parseFloat((e.sentiment.negativity * 100).toFixed(2))
            }:{
              "positive": 0,
              "negative": 0,
              "neutral": 10
            })
        })
      })
      extract.push({
            "id": "gregreg",
            "label": "",
            "volume": 1,
            "sentiment": {
              "positive": 0,
              "negative": 0,
              "neutral": 0
            }
        })
      return {...state, fetching: false, fetched: true, extract: extract}
    }
    case "FETCH_KEYWORD_EXTRACTION_REJECTED": {
      return {...state,
      fetching: false,
      fetched: false,
      error: action.payload}
    }
    case "RESET_KEYWORD_EXTRACTION": {
      return {...state,
      fetching: false,
      fetched: false,
      extract: []}
    }
    default: {
      return {...state}
    }
  }

}
