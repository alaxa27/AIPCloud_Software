import axios from 'axios'

export function fetchKeywordExtraction(text) {
  return function(dispatch) {

    dispatch({
      type: "FETCH_KEYWORD_EXTRACTION"
    })

    axios("http://35.189.98.76/analyze/extraction", {
        method: 'post',
        data: {
          sentiment: "1",
          volume: "0.7",
          text: text
        },
        auth: {
          username: 'text@jdc.fr',
          password: '$6$rounds=656000$u.RnnlI4oak01pUt$MYGGNaetg5t18d3/20oS4Hg.HaoNurBrlvbt3uTmdzEctagNnCM1C1FjXEtQduXwMY1aN1z0rfEUpNBM5hxsF1'
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
