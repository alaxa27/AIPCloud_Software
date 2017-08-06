export default function reducer(state={
  fetching: false,
  fetched: false,
  error: null,
  extract: []
}, action) {
  switch(action.type){
    case "FETCH_KEYWORD_EXTRACTION": {
      return {...state, fetching: true, fetched: false}
    }
    case "FETCH_KEYWORD_EXTRACTION_FULFILLED": {
      const extract = [];
      action.payload.map(e => {
        e.score *= 10000;
        extract.push({
          "id": "1751295897__" + e.keyword,
          "label": e.keyword,
          "volume": e.score,
          "sentiment": {
            "positive": e.sentiment.positivity,
            "neutral": e.sentiment.neutrality,
            "negative": e.sentiment.negativity
          },
          "sentimentScore": e.sentiment.relevance
        })
      })
      extract.push({
            "id": "1751295897__Béfezkflin",
            "label": "",
            "volume": 1,
        })
      console.log(extract);
      return {...state, fetching: false, fetched: true, extract: extract}
    }
    case "FETCH_KEYWORD_EXTRACTION_REJECTED": {
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
