import {
  CREATE_ENTRY,
  CREATE_ENTRY_FULFILLED,
  FETCH_ENTRIES,
  FETCH_ENTRIES_FULFILLED,
  FETCH_ENTRIES_REJECTED,
  FETCH_ENTRY,
  FETCH_ENTRY_FULFILLED,
  FETCH_ENTRY_REJECTED
} from '../actions/types';

const entry = {
  loading: false,
  checked: null,
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
    add_modal: false,
    loading: false,
    entries: [
      entry
    ],
    entry: entry
  }, action) {
  switch (action.type) {
    case FETCH_ENTRIES:
      return {
        ...state,
        loading: true
      }
    case FETCH_ENTRIES_FULFILLED:
      return {
        ...state,
        entries: action.payload,
        loading: false
      };
    case FETCH_ENTRIES_REJECTED:
      return {
        ...state,
        loading: false
      }
    case FETCH_ENTRY:
      state.entry.loading = true;
      return state
    case FETCH_ENTRY_FULFILLED:
      action.payload.loading = false;
      return { ...state,
        entry: action.payload,
      };
    case FETCH_ENTRY_REJECTED:
      state.entry.loading = false;
      return state;
  }

  return state;
}
