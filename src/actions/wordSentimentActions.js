import axios from 'axios'

export function fetchWordSentiment(word) {
  //Need AJAX Here. If it works I think I need to dispatch another action.
  // Let's say GET_TEXT_SENTIMENT_FULFILLED...
  return function(dispatch) {

    dispatch({
      type: "FETCH_WORD_SENTIMENT"
    })

    axios("http://35.189.98.76/analyze/word", {
        method: 'post',
        data: {
          word: word
        },
        auth: {
          username: 'text@jdc.fr',
          password: 'jdc'
        }

      })
      .then((res) => {
        console.log("Response", res);
        dispatch({
          type: "FETCH_WORD_SENTIMENT_FULFILLED",
          payload: res.data
        })
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "FETCH_WORD_SENTIMENT_SENTIMENT_REJECTED",
          payload: err
        })
      })
  }
}
