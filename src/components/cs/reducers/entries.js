import {
  FETCH_ENTRIES,
  FETCH_ENTRIES_FULFILLED,
  FETCH_ENTRY_FULFILLED
} from '../actions/types';

const entry = {
  loaded: false,
  customer: {
    first_name: "",
    last_name: ""
  },
  sales: {
    first_name: "",
    last_name: ""
  },
  timestamp: new Date(),
  analysis: {
    speech_2_text: {
      results: []
    },
    emotion: {
      results: [{
        angry: 0,
        calm: 0,
        disgust: 0,
        fearful: 0,
        happy: 0,
        neutral: 0,
        sad: 0,
        surprise: 0
      }]
    }
  }
};


export default function(state = {
    done: false,
    entries: [
      entry
    ],
    entry: entry
  }, action) {
  switch (action.type) {
    case FETCH_ENTRIES_FULFILLED:
      return { ...state,
        entries: action.payload
      };
    case FETCH_ENTRY_FULFILLED:
      action.payload.loaded = true
      return { ...state,
        entry: action.payload,
        done: true
      };
  }

  return state;
}
