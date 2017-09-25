import axios from 'axios'

export function fetchKeywordExtraction(text, volume) {
  return function(dispatch) {

    dispatch({
      type: "FETCH_KEYWORD_EXTRACTION"
    })

    axios("https://api.aipcloud.io/analyze/extraction", {
        method: 'post',
        data: {
          sentiment: "0",
          volume: volume,
          text: text
        },
        auth: {
          username: 'test1@jdc.fr',
          password: 'dfgdfg1.'
        }

      })
      .then((res) => {
        console.log("Response", res);
        dispatch({
          type: "FETCH_KEYWORD_EXTRACTION_FULFILLED",
          payload: res.data
        })
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "FETCH_KEYWORD_EXTRACTION_REJECTED",
          payload: err
        })
      })
  }
}
