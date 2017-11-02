import {
  FETCH_ANALYSIS,
  FETCH_ANALYSIS_FULFILLED,
  FETCH_ANALYSIS_REJECTED,
  FETCH_S2T,
  FETCH_S2T_FULFILLED,
  FETCH_S2T_REJECTED,
  FETCH_EMOTION,
  FETCH_EMOTION_FULFILLED,
  FETCH_EMOTION_REJECTED
} from '../actions/types';

const speech_2_text = {
  results: []
}
const emotion = {
  results: [{
    angry: 1,
    calm: 1,
    disgust: 1,
    fearful: 1,
    happy: 1,
    neutral: 1,
    sad: 1,
    surprise: 1
  }]
}


export default function(state = {
  analyzing: false,
  speech_2_text: speech_2_text,
  emotion: emotion
}, action) {
  switch (action.type) {
    case FETCH_ANALYSIS:
      return { ...state,
        analyzing: true
      };
    case FETCH_ANALYSIS_FULFILLED:
      action.payload.loaded = true
      return { ...state,
        analyzing: false
      };
    case FETCH_ANALYSIS_REJECTED:
      return { ...state,
        analyzing: false
      }
    case FETCH_S2T:
      return {
        ...state
      }
    case FETCH_S2T_FULFILLED:
      return {
        ...state,
        speech_2_text: action.payload
      }
    case FETCH_EMOTION:
      return {
        ...state
      }
    case FETCH_EMOTION_FULFILLED:
      return {
        ...state,
        emotion: action.payload
      }
  }

  return state;
}
