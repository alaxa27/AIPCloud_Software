import axios from 'axios'

export function fetchTextSentiment(text) {
  //Need AJAX Here. If it works I think I need to dispatch another action.
  // Let's say GET_TEXT_SENTIMENT_FULFILLED...
  return function(dispatch) {

    console.log(text);

    dispatch({
      type: "FETCH_TEXT_SENTIMENT"
    })

    axios("http://35.189.98.76/analyze/text", {
        method: 'post',
        data: {
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
          type: "FETCH_TEXT_SENTIMENT_FULFILLED",
          payload: res.data
        })
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "FETCH_TEXT_SENTIMENT_REJECTED",
          payload: err
        })
      })
  }
}
