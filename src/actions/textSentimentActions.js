import axios from 'axios'

export function fetchTextSentiment(text) {
  //Need AJAX Here. If it works I think I need to dispatch another action.
  // Let's say GET_TEXT_SENTIMENT_FULFILLED...
  return function(dispatch) {
    let textType;
    if (text.split(/[;!?.]+/g).length > 2 && text.length > 60) {
      textType = "text";
    } else {
      textType = "sentence";
    }

    dispatch({
      type: "FETCH_TEXT_SENTIMENT"
    })

    axios("https://api.aipcloud.io/analyze/" + textType, {
        method: 'post',
        data: {
          text: text,
          sentence: text
        },
        auth: {
          username: 'test1@jdc.fr',
          password: 'dfgdfg1.'
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
