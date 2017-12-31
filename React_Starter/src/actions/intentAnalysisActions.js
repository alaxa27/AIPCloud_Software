import axios from 'axios'

// export function resetCustomerAnalysis() {
//   return function(dispatch) {
//     dispatch({
//       type: "RESET_CUSTOMER_ANALYSIS"
//     })
//   }
// }

export function fetchIntentAnalysis(text) {
  //Need AJAX Here. If it works I think I need to dispatch another action.
  // Let's say GET_TEXT_SENTIMENT_FULFILLED...
  return function(dispatch) {

    dispatch({
      type: "FETCH_INTENT_ANALYSIS"
    })

    axios("https://api.aipcloud.io/analyze/intent", {
        method: 'post',
        data: {
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
          type: "FETCH_INTENT_ANALYSIS_FULFILLED",
          payload: res.data
        })
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "FETCH_INTENT_ANALYSIS_REJECTED",
          payload: err
        })
      })
  }
}
