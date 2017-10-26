import axios from 'axios'

export default (text) => {
  //Need AJAX Here. If it works I think I need to dispatch another action.
  // Let's say GET_TEXT_SENTIMENT_FULFILLED...
  let textType;
  if (text.split(/[;!?.]+/g).length > 2 && text.length > 66) {
    textType = "text";
  } else {
    textType = "sentence";
  }

  return axios("https://api.aipcloud.io/analyze/" + textType, {
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
}
