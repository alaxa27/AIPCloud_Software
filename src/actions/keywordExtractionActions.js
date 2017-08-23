import axios from 'axios'

export function fetchKeywordExtraction(text) {
  return function(dispatch) {

    dispatch({
      type: "FETCH_KEYWORD_EXTRACTION"
    })

    axios("http://35.189.98.76/analyze/extraction", {
        method: 'post',
        data: {
          sentiment: "0",
          volume: "0.7",
          text: text
        },
        auth: {
          username: 'text@jdc.fr',
          password: 'jdc'
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
